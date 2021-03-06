<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Employee extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            "id" => $this->id,
            "name" => $this->name,
            "code" => $this->code,
            "email" => $this->email,
            "receipts" => Receipt::collection($this->whenLoaded('receipts')),
            "created_at" => $this->created_at->format("M d Y"),
        ];
    }
}
