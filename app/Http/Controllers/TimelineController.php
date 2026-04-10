<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTimelineRequest;
use App\Http\Requests\UpdateTimelineRequest;
use App\Models\Event;
use App\Models\Timeline;

class TimelineController extends Controller
{
    public function store(StoreTimelineRequest $request, Event $event)
    {
        $event->timelines()->create($request->validated());

        return back()->with('success', 'Timeline task created.');
    }

    public function update(UpdateTimelineRequest $request, Timeline $timeline)
    {
        $this->authorize('update', $timeline);
        $timeline->update($request->validated());

        return back()->with('success', 'Timeline task updated.');
    }

    public function destroy(Timeline $timeline)
    {
        $this->authorize('delete', $timeline);
        $timeline->delete();

        return back()->with('success', 'Timeline task deleted.');
    }
}
