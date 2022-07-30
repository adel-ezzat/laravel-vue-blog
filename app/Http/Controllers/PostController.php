<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use Illuminate\Support\Facades\Validator;
use App\Http\Requests\PostRequest;



class PostController extends Controller
{
    public function createPost(PostRequest $request)
    {
        $post = Post::create($request->validated());
        return response()->json(['status' => 'success', 'data' => $post], 201);
    }

    public function getPosts()
    {
        $posts = Post::orderBy('id', 'desc')->paginate(10);
        return response()->json(['status' => 'success', 'data' => $posts], 200);
    }

    public function updatePost(PostRequest $request, $id)
    {
        $post = Post::find($id)
        ->update($request->validated());
        
        return response()->json(['status' => 'success', 'data' => $post], 200);
    }

    public function deletePost($id)
    {
        $post = Post::find($id);
        if($post->delete()) {
            return response()->json(['status' => 'success'], 200);
        } else {
            return response()->json(['status' => 'error'], 400);
        }
    }
}
