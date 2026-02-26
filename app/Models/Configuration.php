<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Configuration extends Model
{
    protected $fillable = [
        'label',
        'description',
        'group',
        'key',
        'value',
        'type',
    ];

    protected $casts = [
        'group' => 'string',
        'type' => 'string',
    ];

    // Scopes for groups
    public function scopeSite($query)
    {
        return $query->where('group', 'site');
    }

    public function scopeEmail($query)
    {
        return $query->where('group', 'email');
    }

    public function scopeSystem($query)
    {
        return $query->where('group', 'system');
    }

    public function scopePayment($query)
    {
        return $query->where('group', 'payment');
    }

    public function scopeShipping($query)
    {
        return $query->where('group', 'shipping');
    }

    public function scopeOther($query)
    {
        return $query->where('group', 'other');
    }
}
