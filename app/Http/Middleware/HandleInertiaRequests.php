<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Inspiring;
use App\Support\Enums\VisitorAction;
use App\Support\Enums\PageList;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        $user = $request->user();
        
        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'csrfToken' => csrf_token(),
            'auth' => [
                'user' => $user,
                'permissions' => $user?->getAllPermissions()->pluck('name') ?? [],
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],
            'appUrl' => config('app.url'),
            'seo' => [
                'title' => null,
                'description' => null,
                'image' => null,
                'keywords' => null,
            ],
            
            'actionOptions'  => VisitorAction::getOptions(),
            'visitorActions' => VisitorAction::getShorthandActions(),
            'appPages'       => PageList::getShorthandPages(),
        ];
    }
}