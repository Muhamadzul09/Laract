<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\News;
use Database\Factories\NewsFactory;

class NewsSeeder extends Seeder
{
    public function run(): void
    {
        News::factory(15)->create();
        // run migration factory in cmd with
        //php artisan db:seed --class=NewsSeeder

    }
}
