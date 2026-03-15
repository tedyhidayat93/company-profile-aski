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
        return redirect()->route('settings.configuration.show', 'site');
    }

    public function show($group)
    {
        $configurations = Configuration::where('group', $group)
            ->orderBy('id')
            ->get();
        
        return Inertia::render('backpanel/settings/configuration/site', [
            'configurations' => $configurations,
            'currentGroup' => $group
        ]);
    }

    public function store(Request $request, $group)
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

    public function update(Request $request, $group)
    {
        $request->validate([
            'id' => 'required|exists:configurations,id',
            'value' => 'nullable|string',
            'file' => 'nullable|file|image|max:5120'
        ]);

        $config = Configuration::findOrFail($request->id);

        $value = $request->value;

        if ($request->hasFile('file') && $config->type === 'image') {
            $path = $request->file('file')->store('configurations', 'public');
            $value = $path;
        }

        $config->update([
            'value' => $value
        ]);

        return back()->with('success', 'Value berhasil diperbarui');
    }

    public function destroy(Request $request, $group, $id)
    {
        $configuration = Configuration::findOrFail($id);
        $configuration->delete();

        return redirect()->back()
            ->with('success', 'Konfigurasi berhasil dihapus');
    }
}
