import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductCheckout = ({ product, imgUrl, visible, totalPrice }) => {
    return visible ? (
        <div class="flex items-center justify-center flex-wrap gap-10 w-full">
            <div class="bg-indigo-500/5 border border-gray-500/20 text-sm text-gray-500 flex flex-col items-center w-80 rounded-lg">
                <div class="flex items-center justify-between w-full px-4 py-2">
                    <div class="flex items-center justify-between gap-3">
                        <div class="bg-white p-1.5 rounded border border-gray-500/30">
                            <img class="h-9" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgwhjcxzqmjvosYEE7sGJb4d1ebVeYXPjjxwBvsJmAeXUMLCinBJjWEWBz6MyK0R-VX3EsSdqihuske8Ktt6tSTCEwgFNbE9aSxeOFylUv-CQd3mO0UqQhYBNpXS54vnvJ1nfJnPCj2kLdoCVewlVDpXwKt1TtXtkw2qr9IS0oSIfvhBWvkdXULENQT/s2953/Logo%20GPN_Thumnail.png" alt="dummyFavicon"></img>
                        </div>
                        <p class="text-lg text-gray-800">GPN Payment</p>
                    </div>
                    <button type="button" aria-label="more">
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 11.917a.917.917 0 1 0 0-1.833.917.917 0 0 0 0 1.833M11 5.5a.917.917 0 1 0 0-1.833.917.917 0 0 0 0 1.833m0 12.834a.917.917 0 1 0 0-1.834.917.917 0 0 0 0 1.834" stroke="#6B7280" stroke-opacity=".8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>
                </div>
                <div class="flex flex-col items-center gap-2 w-full p-4 pb-2 rounded-b-lg bg-white border-t border-gray-500/20">
                    <div class="flex items-center w-full justify-between">
                        <p>Payment Method</p>
                        <p>Transfer via GPN</p>
                    </div>
                    <div class="w-full h-px bg-gray-300/60"></div>
                    <div class="flex items-center w-full justify-between">
                        <p>Amount</p>
                        <div class="flex items-center gap-2">
                            <p>${totalPrice}</p>
                        </div>
                    </div>
                </div>
            </div>

         
        </div>
    ):(
        <div class="hidden"></div>
    );
}
export default ProductCheckout;