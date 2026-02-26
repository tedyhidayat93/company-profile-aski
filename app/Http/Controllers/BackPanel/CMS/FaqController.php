<?php

namespace App\Http\Controllers\BackPanel\CMS;

use App\Http\Controllers\Controller;
use App\Models\Faq;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class FaqController extends Controller
{
    public function index(Request $request)
    {
        $faqs = Faq::when($request->search, function ($query, $search) {
                return $query->where('question', 'like', "%{$search}%")
                    ->orWhere('answer', 'like', "%{$search}%");
            })
            ->when($request->category, function ($query, $category) {
                return $query->where('category', $category);
            })
            ->when($request->active !== null, function ($query, $active) {
                return $query->where('is_active', $active === 'true');
            })
            ->orderBy('category')
            ->orderBy('position')
            ->orderBy('question')
            ->paginate(15);

        return Inertia::render('backpanel/faq/index', [
            'faqs' => $faqs,
            'filters' => $request->only(['search', 'category', 'active'])
        ]);
    }

    public function create()
    {
        return Inertia::render('backpanel/faq/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'question' => 'required|string|max:255',
            'answer' => 'required|string',
            'category' => 'required|string|max:100',
            'position' => 'nullable|integer|min:0',
            'is_active' => 'boolean',
        ]);

        $validated['position'] = $validated['position'] ?? 0;
        $validated['is_active'] = $validated['is_active'] ?? true;

        $faq = Faq::create($validated);

        return redirect()->route('cms.faqs.index')
            ->with('success', 'FAQ berhasil dibuat');
    }

    public function show($id)
    {
        $faq = Faq::findOrFail($id);

        return Inertia::render('backpanel/faq/show', [
            'faq' => $faq
        ]);
    }

    public function edit($id)
    {
        $faq = Faq::findOrFail($id);

        return Inertia::render('backpanel/faq/edit', [
            'faq' => $faq
        ]);
    }

    public function update(Request $request, $id)
    {
        $faq = Faq::findOrFail($id);

        $validated = $request->validate([
            'question' => 'required|string|max:255',
            'answer' => 'required|string',
            'category' => 'required|string|max:100',
            'position' => 'nullable|integer|min:0',
            'is_active' => 'boolean',
        ]);

        $validated['position'] = $validated['position'] ?? $faq->position;
        $validated['is_active'] = $validated['is_active'] ?? $faq->is_active;

        $faq->update($validated);

        return redirect()->route('cms.faqs.index')
            ->with('success', 'FAQ berhasil diperbarui');
    }

    public function destroy($id)
    {
        $faq = Faq::findOrFail($id);

        $faq->delete();

        return redirect()->route('cms.faqs.index')
            ->with('success', 'FAQ berhasil dihapus');
    }

    public function toggleStatus($id)
    {
        $faq = Faq::findOrFail($id);
        $faq->is_active = !$faq->is_active;
        $faq->save();

        return redirect()->route('cms.faqs.index')
            ->with('success', 'Status FAQ berhasil diperbarui');
    }

    public function updatePosition(Request $request)
    {
        $validated = $request->validate([
            'faqs' => 'required|array',
            'faqs.*.id' => 'required|integer|exists:faqs,id',
            'faqs.*.position' => 'required|integer|min:0',
        ]);

        foreach ($validated['faqs'] as $faqData) {
            Faq::where('id', $faqData['id'])
                ->update(['position' => $faqData['position']]);
        }

        return redirect()->route('cms.faqs.index')
            ->with('success', 'Posisi FAQ berhasil diperbarui');
    }
}