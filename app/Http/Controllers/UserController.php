<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use App\Http\Requests\{UserCreateRequest, UserLoginRequest};

class UserController extends Controller
{
    public function createUser(UserCreateRequest $request)
    {
        $user = User::create($request->validated());
        $token = $user->createToken(config('app.name'))->plainTextToken;
        return response()->json(['status' => 'success', 'data' => $user, 'token' => $token], 201);
    }

    public function login(UserLoginRequest $request) {
        if(!auth()->attempt($request->validated())) {
            return response()->json(['status' => 'error', 'message' => 'Invalid credentials'], 401);
        }

        $token = auth()->user()->createToken(config('app.name'))->plainTextToken;
        return response()->json(['status' => 'success', 'data' => auth()->user(), 'token' => $token], 200);
    }

    public function logout() {
        auth()->user()->currentAccessToken()->delete();
        return response()->json(['status' => 'success', 'message' => 'User logged out successfully'], 200);
    }
}
