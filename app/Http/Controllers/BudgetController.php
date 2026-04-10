<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBudgetItemRequest;
use App\Http\Requests\UpdateBudgetItemRequest;
use App\Models\Budget;
use App\Models\BudgetItem;

class BudgetController extends Controller
{
    public function storeItem(StoreBudgetItemRequest $request, Budget $budget)
    {
        $item = $budget->items()->create($request->validated());
        $budget->recalculateTotals();

        return back()->with('success', 'Budget item created.');
    }

    public function updateItem(UpdateBudgetItemRequest $request, BudgetItem $budgetItem)
    {
        $budgetItem->update($request->validated());
        $budgetItem->budget->recalculateTotals();

        return back()->with('success', 'Budget item updated.');
    }

    public function destroyItem(BudgetItem $budgetItem)
    {
        $budgetItem->delete();

        return back()->with('success', 'Budget item deleted.');
    }
}
