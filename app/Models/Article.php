<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Builder;

class Article extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'slug',
        'content',
        'excerpt',
        'featured_image',
        'status',
        'published_at',
        'author_id',
        'meta_title',
        'meta_description',
        'meta_keywords',
        'views_count',
        'tags',
    ];

    protected $casts = [
        'published_at' => 'datetime',
        'deleted_at' => 'datetime',
        'tags' => 'array',
    ];

    protected $attributes = [
        'tags' => '[]',
    ];

    // Relationships
    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    /**
     * Get the tags as an array.
     *
     * @return array
     */
    public function getTagsAttribute($value)
    {
        return json_decode($value, true) ?? [];
    }

    /**
     * Set the tags as a JSON string.
     *
     * @param  array|string  $value
     * @return void
     */
    public function setTagsAttribute($value)
    {
        $this->attributes['tags'] = is_array($value) ? json_encode(array_values(array_unique($value))) : $value;
    }

    /**
     * Check if the article has a specific tag.
     *
     * @param  string  $tag
     * @return bool
     */
    public function hasTag($tag)
    {
        return in_array($tag, $this->tags);
    }

    /**
     * Add a tag to the article.
     *
     * @param  string  $tag
     * @return void
     */
    public function addTag($tag)
    {
        $tags = $this->tags;
        if (!in_array($tag, $tags)) {
            $tags[] = $tag;
            $this->tags = $tags;
        }
    }

    /**
     * Remove a tag from the article.
     *
     * @param  string  $tag
     * @return void
     */
    public function removeTag($tag)
    {
        $tags = $this->tags;
        $key = array_search($tag, $tags);
        if ($key !== false) {
            unset($tags[$key]);
            $this->tags = array_values($tags); // Re-index array
        }
    }

    // Scopes
    public function scopePublished($query)
    {
        return $query->where('status', 'published')
            ->where('published_at', '<=', now());
    }

    public function scopeDraft($query)
    {
        return $query->where('status', 'draft');
    }

    public function scopeArchived($query)
    {
        return $query->where('status', 'archived');
    }

    public function scopePopular($query, $days = 30)
    {
        return $query->where('published_at', '>=', now()->subDays($days))
            ->orderBy('views_count', 'desc');
    }
}
