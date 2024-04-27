<?php

namespace App\Http\Controllers;
use App\Models\News;
use Inertia\Inertia;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        // Ambil berita yang diposting oleh pengguna yang terautentikasi dan urutkan berdasarkan id secara descending
        $mynews = News::where('author', auth()->user()->email)->orderBy('id', 'DESC')->get();
        
        // Pastikan untuk mengirimkan data $mynews ke tampilan Inertia
        return Inertia::render('Dashboard', [
            'mynews' => $mynews
        ]);
    }
    
}
