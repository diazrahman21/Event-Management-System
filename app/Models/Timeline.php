<?php

namespace App\Models;

use App\Enums\TimelineStatus;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Timeline extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'event_id',
        'title',
        'description',
        'due_date',
        'status',
        'order',
        'assigned_to',
    ];

    protected $casts = [
        'due_date' => 'datetime',
        'status' => TimelineStatus::class,
    ];

    /**
     * Get the event for this timeline.
     */
    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class);
    }

    /**
     * Get the user this timeline is assigned to.
     */
    public function assignee(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }
}
