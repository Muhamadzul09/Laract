<?php

namespace App\Http\Controllers;

use App\Models\News;
use App\Http\Requests\StorenewsRequest;
use App\Http\Requests\UpdatenewsRequest;
use App\Http\Resources\NewsCollection;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;



class NewsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
{
    // Mengambil data berita dengan urutan descending berdasarkan id dan paginasi 5 menggunakan Eloquent
    $news = new NewsCollection(News::orderBy('id', 'DESC')->paginate(5));
    
    // Mengirim data ke tampilan menggunakan Inertia::render
    return Inertia::render('Homepage', [
        'title' => 'Homepage',
        'description' => 'Selamat Datang',
        'news' => $news
    ]);
}


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $news = new NewsCollection(News::paginate(5));
        return Inertia::render('DashboardCreate', [
            'title' => 'Dashboard Create',
            'news' => $news
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $news = new News();
        $news->title = $request->title;
        $news->description = $request->description;
        $news->category = $request->category;
        $news->author = auth()->user()->email;
        $news->save();
        // return redirect()->back()->with('message', 'News created successfully'); akan mengarah kehalaman sebelumnya 
        return redirect("/dashboard")->with('message', 'News created successfully');

    }

    /**
     * Display the specified resource.
     */


         // Memeriksa apakah pengguna telah terautentikasi
         
         public function show()
         {
             // Ambil berita yang diposting oleh pengguna yang terautentikasi
             $mynews = News::where('author', auth()->user()->email)->get();
             dd($mynews);
             
             // Pastikan untuk mengirimkan data $mynews ke tampilan Inertia
             return Inertia::render('Dashboard', [
                 'mynews' => $mynews
             ]);
         }
              
         
         
     

    
    /** 
     * Show the form for editing the specified resource.
     */
    public function edit(News $news, Request $request)
    {

        return Inertia::render('EditDashboard', [
           'title' => 'Edit Dashboard',
           'myNews' => $news->find($request->id)
       ]);
    }

    /**                                                                                                                 
     * Update the specified resource in storage.r
     */
    public function update(Request $request)
    {
        News::where('id', $request->id)->update([
            'title' => $request->title,
            'description' => $request->description,
            'category' => $request->category,
        ]);

        return to_route("dashboard")->with('message', 'News updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $news = News::find($request->id);
        $news->delete();
        return redirect()->back()->with('message', 'News deleted successfully');
    }
}
