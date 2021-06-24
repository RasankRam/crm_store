<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductOffer extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return array
   */
  public function toArray($request)
  {
    $this->setRelation('product', $this->product);

    $output_array = [
      "id" => $this->id,
      "code" => $this->code,
      'count' => $this->count,
      "product" => new Product($this->whenLoaded('product')),
      "delivery" => new Delivery($this->whenLoaded('delivery')),
      "receipt" => new Receipt($this->whenLoaded('receipt')),
      "employee" => new Employee($this->whenLoaded('employee')),
      "address" => $this->address,
      "created_at" => $this->receipt->created_at->format("M d Y"),
      "delivered_at" => $this->delivered_at,
      "start_at" => $this->start_at,
      "end_at" => $this->end_at,
    ];

    $this->unsetRelation('product');

    return $output_array;
  }
}
