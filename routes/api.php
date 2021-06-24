<?php

use App\Http\Controllers\Api\v1\CategoryController;
use App\Http\Controllers\Api\v1\ClientController;
use App\Http\Controllers\Api\v1\DeliveryController;
use App\Http\Controllers\Api\v1\EmployeeController;
use App\Http\Controllers\Api\v1\OfficeController;
use App\Http\Controllers\Api\v1\PickupPointController;
use App\Http\Controllers\Api\v1\ProductController;
use App\Http\Controllers\Api\v1\ProductOfferController;
use App\Http\Controllers\Api\v1\ReceiptController;
use App\Http\Resources\AddressCollection;
use App\Http\Resources\Address as AddressResource;
use App\Http\Resources\EmployeeCollection;
use App\Http\Resources\OfficeCollection;
use App\Http\Resources\Office as OfficeResource;
use App\Http\Resources\Publication as PublicationResource;
use App\Http\Resources\PublicationCollection;
use App\Models\Client;
use App\Models\Delivery;
use App\Models\Employee;
use App\Models\Receipt;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('deliveries', function () {
  return response()->json([
    "status" => true,
    "response" => Delivery::all()
  ]);
});

/**
 * Get delivery via specified name
 */

Route::get('delivery/title', function (Request $request) {

  if (!$request->title) {
    return response()->json([
      "status" => false,
      "error" => "title param is empty"
    ], 400);
  }

  $delivery = Delivery::where('title', $request->title)->first();

  if (!$delivery) {
    return response()->json([
      "status" => false,
      "error" => "Delivery not found"
    ], 404);
  }

  return response()->json([
    "status" => true,
    "response" => $delivery,
  ], 200);

});

Route::get('reset', function () {
    Artisan::call('migrate:fresh --seed');
    return response()->json([
       "status" => true,
       "response" => "Site in initial state"
    ], 200);
});


/**
 * Аутентификация
 */

Route::post('/create',[EmployeeController::class,"create"]);
Route::post('/login',[EmployeeController::class,"login"]);

/**
 * Товары
 */

Route::get('products', [ProductController::class,'index']);
Route::get('products/name', [ProductController::class, 'show_name']);
Route::get('products_price/{name}', [ProductController::class, 'learn_price']);
Route::get('products/{code}', [ProductController::class,'show']);
Route::group(['middleware' => 'bearer_auth'], function () {

//    Route::group(['middleware' => 'check.admin'], function () {
        Route::post('products', [ProductController::class, 'store']);
        Route::put('products/{product}', [ProductController::class,'update']);
        Route::patch('products/{product}', [ProductController::class, 'update_patch']);
        Route::delete('products/{product}', [ProductController::class, 'destroy']);
//    });
});

/**
 * Категории
 */

Route::group(['middleware' => 'bearer_auth'], function () {
  Route::get('categories', [CategoryController::class, 'index']);
});

/**
 * Продажи
 */

Route::group(['middleware' => 'bearer_auth'], function () {
    Route::get('product_offers', [ProductOfferController::class,'index']);
    Route::get('product_offers/{code}', [ProductOfferController::class,'show_code']);
    Route::get('product_offers/deliver/{code}', [ProductOfferController::class,'deliver']);
    Route::post('product_offers', [ProductOfferController::class, 'store']);
    Route::delete('product_offers/{product_offer}', [ProductOfferController::class, 'destroy']);
    Route::group(['middleware' => 'check.admin'], function () {
        Route::put('product_offers/{subscription}', [ProductOfferController::class, 'update']);
    });
});

/**
 * Пункты выдачи
 */

Route::get('pickup_points', [PickupPointController::class, 'index']);
Route::get('pickup_points/{code}', [PickupPointController::class,'show_code']);

Route::post('pickup_points', [PickupPointController::class, 'store']);
Route::group(['middleware' => 'bearer_auth'], function () {
    Route::group(['middleware' => 'check.admin'], function () {
        Route::put('pickup_points/{pickup_point}', [PickupPointController::class,'update']);
        Route::delete('pickup_points/{pickup_point}', [PickupPointController::class, 'destroy']);
    });
});

/**
 * Клиенты
 */

Route::post('clients/get_office', [ClientController::class, 'get_office']);

Route::group(['middleware' => 'bearer_auth'], function () {
    Route::get('clients', [ClientController::class, 'index']);
    Route::get('clients/{code}', [ClientController::class, 'show']);
    Route::post('clients', [ClientController::class, 'store']);
    Route::put('clients/{client}', [ClientController::class, 'update']);
    Route::patch('clients/{client}', [ClientController::class, 'update_patch']);
    Route::delete('clients/{client}', [ClientController::class, 'destroy']);
});

/**
 * Квитанции
 */


Route::group(['middleware' => 'bearer_auth'], function () {
   Route::get('receipts', [ReceiptController::class, 'index']);
   Route::post('receipts/issue', [ReceiptController::class, 'issue']);
   Route::get('receipts/{code}', [ReceiptController::class, 'show_code']);
   Route::get('receipts/{code}/pay', [ReceiptController::class, 'pay']);
   Route::get('receipts/{code}/subscriptions', [ReceiptController::class, 'subscriptions']);
   Route::post('receipts', [ReceiptController::class, 'store']);
   Route::group(['middleware' => 'check.admin'], function() {
       Route::put('receipts/{receipt}', [ReceiptController::class, 'update']);
   });
   Route::delete('receipts/{receipt}', [ReceiptController::class, 'destroy']);
});

/**
 * Сотрудники
 */

Route::group(['middleware' => 'bearer_auth'], function () {
   Route::get('employees', [EmployeeController::class ,'index']);
   Route::get('employees/{code}', [EmployeeController::class,'show_code']);
   Route::patch('update_profile', [EmployeeController::class,'update_profile']);
 //  Route::get('employees/{id_office}', [EmployeeController::class, 'office']);
   Route::group(['middleware' => 'check.admin'], function () {
       Route::post('employess', [EmployeeController::class, 'store']);
       Route::put('employess/{employee}', [EmployeeController::class, 'update']);
       Route::delete('employees/{employee}', [EmployeeController::class, 'destroy']);
   });
});
