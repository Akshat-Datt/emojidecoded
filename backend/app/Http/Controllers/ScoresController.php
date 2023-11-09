<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Score;

class ScoresController extends Controller
{
    //

    public function test()
    {
        return response()->json(['success' => true]);
    }

    public function index()
    {
      
        $scores = Score::orderBy('score', 'desc')->get();

        return response()->json(['data' =>  $scores ]);
    }


    public function store(Request $request)
    {
        
        $request->validate([
            'nickName' => 'required|string',
            'score' => 'required|integer',
        ]);

      
        $score = new Score([
            'nickName' => $request->input('nickName'),
            'score' => $request->input('score'),
        ]);

        $score->save();

        return response()->json(['success' => true]);
    }
}
