<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Arr;

class Product extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'slug',
        'type',
        'description',
        'short_description',
        'sku',
        'price',
        'compare_at_price',
        'cost_per_item',
        'track_quantity',
        'quantity',
        'barcode',
        'status',
        'is_featured',
        'is_bestseller',
        'is_new',
        'published_at',
        'brand_id',
        'category_id',
        'meta_title',
        'meta_description',
        'tags',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'compare_at_price' => 'decimal:2',
        'cost_per_item' => 'decimal:2',
        'track_quantity' => 'boolean',
        'is_featured' => 'boolean',
        'is_bestseller' => 'boolean',
        'is_new' => 'boolean',
        'published_at' => 'datetime',
        'deleted_at' => 'datetime',
        'tags' => 'array',
    ];

    protected $attributes = [
        'tags' => '[]',
    ];

    // Relationships
    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
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
     * Check if the product has a specific tag.
     *
     * @param  string  $tag
     * @return bool
     */
    public function hasTag($tag)
    {
        return in_array($tag, $this->tags);
    }

    /**
     * Add a tag to the product.
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
     * Remove a tag from the product.
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

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    public function scopeBestseller($query)
    {
        return $query->where('is_bestseller', true);
    }

    public function scopeNew($query)
    {
        return $query->where('is_new', true);
    }

    public function scopeOfType($query, $type)
    {
        return $query->where('type', $type);
    }
}
