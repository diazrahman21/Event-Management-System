<?php

namespace App\Models;

use App\Enums\BudgetItemStatus;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BudgetItem extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'budget_id',
        'category',
        'description',
        'planned_amount',
        'actual_amount',
        'status',
    ];

    protected $casts = [
        'planned_amount' => 'decimal:2',
        'actual_amount' => 'decimal:2',
        'status' => BudgetItemStatus::class,
    ];

    /**
     * Get the budget for this item.
     */
    public function budget(): BelongsTo
    {
        return $this->belongsTo(Budget::class);
    }

    /**
     * Boot method to recalculate budget totals on save/delete
     */
    protected static function boot()
    {
        parent::boot();

        static::saved(function ($model) {
            $model->budget->recalculateTotals();
        });

        static::deleted(function ($model) {
            $model->budget->recalculateTotals();
        });
    }

    /**
     * Check if budget item is over planned amount
     */
    public function isOverBudget(): bool
    {
        return $this->actual_amount > $this->planned_amount;
    }
}
