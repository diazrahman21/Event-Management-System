<?php

namespace App\Enums;

enum EventStatus: string
{
    case PLANNING = 'planning';
    case ONGOING = 'ongoing';
    case COMPLETED = 'selesai';

    public function label(): string
    {
        return match($this) {
            self::PLANNING => 'Planning',
            self::ONGOING => 'Ongoing',
            self::COMPLETED => 'Completed',
        };
    }

    public function color(): string
    {
        return match($this) {
            self::PLANNING => 'amber',
            self::ONGOING => 'blue',
            self::COMPLETED => 'green',
        };
    }
}
