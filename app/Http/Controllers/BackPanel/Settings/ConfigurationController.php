<?php

namespace App\Http\Controllers\BackPanel\Settings;

use App\Http\Controllers\Controller;
use App\Models\Configuration;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage; // Tambahkan ini untuk menghapus file lama

class ConfigurationController extends Controller
{
    public function __construct()
    {
        // Apply permission middleware to all methods
        $this->middleware('permission:setting-configuration-list')->only(['index', 'show']);
        $this->middleware('permission:setting-configuration-create')->only(['store']);
        $this->middleware('permission:setting-configuration-edit')->only(['update']);
        $this->middleware('permission:setting-configuration-delete')->only(['destroy']);
    }

    public function index()
    {
        Gate::authorize('setting-configuration-list');
        
        return redirect()->route('settings.configuration.show', 'site');
    }

    public function show($group)
    {
        Gate::authorize('setting-configuration-list');
        
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
        Gate::authorize('setting-configuration-create');
        
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
        Gate::authorize('setting-configuration-edit');
        
        $request->validate([
            'id' => 'required|exists:configurations,id',
            'value' => 'nullable|string',
            // Maksimal 10MB untuk file dokumen atau gambar
            'file' => 'nullable|file|max:10240' 
        ]);

        $config = Configuration::findOrFail($request->id);
        $value = $request->value;

        if ($request->hasFile('file')) {
            // Hapus file fisik lama jika ada di storage untuk menghemat ruang
            if (!empty($config->value) && Storage::disk('public')->exists($config->value)) {
                Storage::disk('public')->delete($config->value);
            }

            // Kondisi 1: Jika spesifik key company_profile_pdf atau bertipe file dokumen
            if ($config->key === 'company_profile_pdf' || $config->type === 'file') {
                // Disimpan ke dalam folder 'documents' di disk public
                $path = $request->file('file')->store('documents', 'public');
                $value = $path;
            } 
            // Kondisi 2: Jika konfigurasi berupa gambar
            elseif ($config->type === 'image') {
                $path = $request->file('file')->store('configurations', 'public');
                $value = $path;
            }
        }

        $config->update([
            'value' => $value
        ]);

        return back()->with('success', 'Konfigurasi berhasil diperbarui');
    }

    public function destroy(Request $request, $group, $id)
    {
        Gate::authorize('setting-configuration-delete');
        
        $configuration = Configuration::findOrFail($id);
        
        // Hapus file fisik dari storage jika tipe datanya berupa file/image sebelum row dihapus
        if (in_array($configuration->type, ['file', 'image']) && !empty($configuration->value)) {
            if (Storage::disk('public')->exists($configuration->value)) {
                Storage::disk('public')->delete($configuration->value);
            }
        }

        $configuration->delete();

        return redirect()->back()
            ->with('success', 'Konfigurasi berhasil dihapus');
    }
}