<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Http\Controllers\Helpers\Cart;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Cookie;
// use Illuminate\Support\Facades\Log;

class CartController extends Controller
{
    public function index()
    {
        $cartItems = Cart::getCartItems();

        $ids = Arr::pluck($cartItems, 'product_id');
        $products = Product::query()->whereIn('id', $ids)->get();
        $cartItems = Arr::keyBy($cartItems, 'product_id');

        $total = 0;
        foreach($products as $product) {
            $total += $product->price * $cartItems[$product->id]['quantity'];
        }

        return response([
            'total' => $total,
            'products' => $products,
            'items' => $cartItems
        ]);
        
    }
    public function add(Request $request, Product $product)
    {
        $quantity = $request->post('quantity', 1);
        $user = $request->user();
        if( $user ){
            $cartItem = CartItem::where(['user_id' => $user->id, 'product_id' => $product->id])->first();

            if($cartItem){
                $cartItem->quantity += $quantity;
                $cartItem->update();
            } else {
                $data = [
                    'user_id' => $request->user()->id,
                    'product_id' => $product->id,
                    'quantity' => $quantity,
                ];

                CartItem::create($data);
            }

            return response([
                'count' => Cart::getCartItemsCount(),
            ]);
        } else {
            $cartItems = json_decode($request->cookie('cart_items', '[]'), true);
            
            $productFound = false;
            // $productFound = array_search($product->id, array_column($cartItems, 'product_id'));

            foreach ($cartItems as &$item) {
                if($item['product_id'] === $product->id) {
                    $item['quantity'] += $quantity;
                    $productFound = true;
                    break;
                }
            }         

            if(!$productFound) {
                $cartItems[] = [
                    'user_id' => null,
                    'product_id' => $product->id,
                    'quantity' => $quantity,
                    'price' => $product->price,
                ];
            }

            
            Cookie::queue('cart_items', json_encode($cartItems), 60 * 24 * 30);

            // Log::debug(Cart::getCartItems());

            return response(['count' => Cart::getCountFromItems($cartItems)]);

        }
        
    }
    public function remove(Request $request, Product $product)
    {
        $user = $request->user();        
        if ($user) {
            $cartItem = CartItem::where(['user_id' => $user->id, 'product_id' => $product->id])->first();

            if ($cartItem) {
                $cartItem->delete();
            }
            return response(['count' => Cart::getCartItemsCount()]);

        } else {
            $cartItems = json_decode($request->cookie('cart_items', '[]'), true);
            foreach ($cartItems as $i => &$item) {
                array_splice($cartItems, $i, 1);
                break;
            }

            Cookie::queue('cart_items', json_encode($cartItems), 60 * 24 * 30);

            return response(['count' => Cart::getCountFromItems($cartItems)]);

        }
        
    }
    public function updateQuantity(Request $request, Product $product)
    {
        $quantity = (int) $request->post('quantity');
        $user = $request->user();
        if ($user) {
            CartItem::where(['user_id' => $user->id, 'product_id' => $product->id])->update(['quantity' => $quantity]);

            return response(['count' => Cart::getCartItemsCount()]);

        } else {
            $cartItems = json_decode($request->cookie('cart_items', '[]'), true);
            foreach ($cartItems as &$item) {
                if($item['product_id'] === $product->id) {
                    $item['quantity'] = $quantity;
                    break;
                }
            }

            Cookie::queue('cart_items', json_encode($cartItems), 60 * 24 * 30);

            return response(['count' => Cart::getCountFromItems($cartItems)]);

        }
        
    }
}
