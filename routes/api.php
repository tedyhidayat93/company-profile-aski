<?php

use App\Http\Controllers\BackPanel\Analytics\VisitorLogController;
use Illuminate\Support\Facades\Route;

// Menggunakan middleware throttle dengan nama alias yang didaftarkan di bootstrap/app.php
Route::post('/visitor-logs/leads', [VisitorLogController::class, 'storeLeadsLog'])
     ->middleware('throttle:leads-tracker');