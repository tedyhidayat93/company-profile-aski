<?php

namespace App\Http\Controllers\BackPanel\Settings;

use App\Http\Controllers\Controller;
use App\Models\Configuration;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ConfigurationController extends Controller
{
    public function index()
    {
        return redirect()->route('settings.configuration.site');
    }

    public function site()
    {
        $configurations = Configuration::site()->orderBy('label')->get();
        
        return Inertia::render('backpanel/settings/configuration/site', [
            'configurations' => $configurations,
            'currentGroup' => 'site'
        ]);
    }

    public function email()
    {
        $configurations = Configuration::email()->orderBy('label')->get();
        
        return Inertia::render('backpanel/settings/configuration/email', [
            'configurations' => $configurations,
            'currentGroup' => 'email'
        ]);
    }

    public function system()
    {
        $configurations = Configuration::system()->orderBy('label')->get();
        
        return Inertia::render('backpanel/settings/configuration/system', [
            'configurations' => $configurations,
            'currentGroup' => 'system'
        ]);
    }

    public function payment()
    {
        $configurations = Configuration::payment()->orderBy('label')->get();
        
        return Inertia::render('backpanel/settings/configuration/payment', [
            'configurations' => $configurations,
            'currentGroup' => 'payment'
        ]);
    }

    public function shipping()
    {
        $configurations = Configuration::shipping()->orderBy('label')->get();
        
        return Inertia::render('backpanel/settings/configuration/shipping', [
            'configurations' => $configurations,
            'currentGroup' => 'shipping'
        ]);
    }

    public function other()
    {
        $configurations = Configuration::other()->orderBy('label')->get();
        
        return Inertia::render('backpanel/settings/configuration/other', [
            'configurations' => $configurations,
            'currentGroup' => 'other'
        ]);
    }

    public function update(Request $request, $group)
    {
        $validated = $request->validate([
            'configurations' => 'required|array',
            'configurations.*.id' => 'required|integer|exists:configurations,id',
            'configurations.*.value' => 'required|string',
        ]);

        foreach ($validated['configurations'] as $configData) {
            Configuration::where('id', $configData['id'])
                ->update(['value' => $configData['value']]);
        }

        return redirect()->back()
            ->with('success', 'Pengaturan berhasil diperbarui');
    }

    public function create(Request $request, $group)
    {
        $validated = $request->validate([
            'label' => 'required|string|max:255',
            'description' => 'nullable|string',
            'key' => 'required|string|max:255|unique:configurations,key',
            'value' => 'required|string',
            'type' => 'required|string|in:text,number,select,checkbox,radio,file,image,textarea,wysiwyg',
        ]);

        $validated['group'] = $group;

        Configuration::create($validated);

        return redirect()->back()
            ->with('success', 'Konfigurasi berhasil ditambahkan');
    }

    public function destroy(Request $request, $group, $id)
    {
        $configuration = Configuration::findOrFail($id);
        $configuration->delete();

        return redirect()->back()
            ->with('success', 'Konfigurasi berhasil dihapus');
    }
}
