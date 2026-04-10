<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Client extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'company',
        'notes',
    ];

    /**
     * Get the events for this client.
     */
    public function events(): BelongsToMany
    {
        return $this->belongsToMany(Event::class)
            ->withTimestamps()
            ->withPivot('role');
    }
}
