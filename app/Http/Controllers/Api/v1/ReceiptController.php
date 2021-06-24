<?php

namespace App\Http\Controllers\Api\v1;

use App\Helpers\AppHelper;
use App\Http\Controllers\Controller;
use App\Http\Resources\Product;
use App\Http\Resources\ReceiptCollection;
use App\Http\Resources\SubscriptionCollection;
use App\Http\Resources\Receipt as ReceiptResource;
use App\Models\ProductOffer;
use App\Models\Receipt;
use App\Models\Subscription;
use Illuminate\Http\Request;
use App\Http\Resources\Subscription as SubscriptionResource;
use Illuminate\Support\Facades\Validator;

class ReceiptController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        return response()->json([
            "status" => true,
            "response" => new ReceiptCollection(Receipt::where('id_employee',AppHelper::check_employee()->id)
              ->with('client', 'employee', 'product_offers')->orderBy('created_at','desc')->paginate(6))
        ], 200);
    }

  /**
   * Issue a receipt
   */

    public function issue(Request $request) {


      $request_data = $request->only(['id_client', 'product_offers']);

      $validator = Validator::make($request_data, [
        "id_client" => "required|numeric",
        "product_offers" => "required",
      ]);

      if ($validator->fails()) {
        return response()->json([
          "status" => false,
          "errors" => $validator->messages()
        ], 422);
      }

      foreach ($request->product_offers as $product_offer) {

        $validator = Validator::make($product_offer, [
          "id_delivery" => "required|numeric",
          'count' => 'required|numeric',
          "id_product" => "required|numeric",
          "date_start" => "required|date",
          "date_end" => "required|date"
        ]);

        if ($validator->fails()) {
          return response()->json([
            "status" => false,
            "errors" => $validator->messages()
          ], 422);
        }
      }

      $code = AppHelper::generate_code('R',Receipt::class);

      $receipt = Receipt::create([
        'code' => $code,
        'id_employee' => AppHelper::check_employee()->id,
        'id_client' => $request->id_client
      ]);

      // subscriptions
      foreach ($request->product_offers as $product_offer) {
        $product_offer = (object) $product_offer;

        ProductOffer::create([
          'id_receipt' => $receipt->id,
          'id_delivery' => $product_offer->id_delivery,
          'id_product' => $product_offer->id_product,
          'count' => $product_offer->count,
          'code' => AppHelper::generate_code('POF', ProductOffer::class),
          'start_at' => $product_offer->date_start,
          'end_at' => $product_offer->date_end
        ]);
      }

      $receipt->sum = $receipt->product_offers->reduce(function ($sum, $item) {
        return $sum + $item->product->price * $item->count;
      }, 0);

      if (!$receipt->sum) {
        return response()->json([
          "status" => false,
          "response" => "No product offers in receipt"
        ], 422);
      }

      $receipt->save();

      return response()->json([
        "status" => true,
        "response" => [
          'code_employee' => AppHelper::check_employee()->code,
          'code_client' => $receipt->client->code,
          'code' => $receipt->code,
          'created_at' => $receipt->created_at,
          'sum' => $receipt->sum
        ],
      ]);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id_receipt)
    {
        $receipt = new ReceiptResource(Receipt::where('id',$id_receipt)->with('product_offers')->first());
        if (!$receipt) {
            return response()->json([
                "status" => false,
                "error" => "Receipt not found",
            ])->setStatusCode(404, "Receipt not found");
        }
        if ($receipt->subscriptions[0]->id_office !== AppHelper::check_employee()->id_office) {
            return response()->json([
                "status" => false,
                "error" => "Access denied",
            ])->setStatusCode(403, "Access denied");
        }
        return response()->json([
            "status" => true,
            "response" => $receipt,
        ]);
    }

    /**
     * Display the specified resource by code
     * @param $code
     * @return \Illuminate\Http\JsonResponse
     */

    public function show_code($code) {
        $receipt = new ReceiptResource(Receipt::where('code', $code)->with('product_offers')->first());
        if (!$receipt->resource) {
            return response()->json([
                "status" => false,
                "error" => "Receipt not found",
            ])->setStatusCode(404,"Receipt not found");
        }
        if ($receipt->id_employee !== AppHelper::check_employee()->id) {
            return response()->json([
                "status" => false,
                "error" => "Access denied",
            ])->setStatusCode(403, "Access denied");
        }
        return response()->json([
            "status" => true,
            "response" => $receipt,
        ],200);
    }

    /**
     * Pay the receipt by code
     */

    public function pay($code) {
        $receipt = Receipt::where('code',$code)->first();
        if (!$receipt) {
            return response()->json([
                "status" => false,
                "error" => "Receipt not found",
            ])->setStatusCode(404, "Receipt not found");
        }

        if ($receipt->id_employee !== AppHelper::check_employee()->id) {
          return response()->json([
            "status" => false,
            "error" => "Access denied"
          ])->setStatusCode(403, "Access denied");
        }

        $receipt->payment_code = AppHelper::generate_code('PY',Receipt::class);
        $receipt->save();
        return response()->json([
            "status" => true,
            "response" => $receipt->payment_code,
        ],200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($code)
    {
        $receipt = Receipt::where('code',$code)->with('subscriptions')->first();
        if (!$receipt) {
            return response()->json([
                "status" => "false",
                "error" => "Receipt not found",
            ])->setStatusCode(404, "Receipt not found");
        }
        if ($receipt->subscriptions->first()->id_employee !== AppHelper::check_employee()->id) {
            return response()->json([
                "status" => false,
                "error" => "Access denied",
            ])->setStatusCode(403, "Access denied");
        }


        $receipt->delete();

        return response()->json([
            "status" => "true",
            "response" => "Receipt has been deleted",
        ],200);
    }

}
