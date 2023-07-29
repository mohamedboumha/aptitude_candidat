<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    use HasFactory;

    protected $fillable = [
        'cle',
        'organisation_id',
        'e_mail',
        'nom',
        'prenom',
        'telephone_fixe',
        'service',
        'fonction',
    ];

    public function organisation(){
        return $this->belongsTo(Organisation::class);
    }

    public function scopeFilter($query, array $filters)
    {
        if ($filters['search'] ?? false) {
            $searchTerm = '%' . $filters['search'] . '%';

            $query->where('nom', 'like', $searchTerm)
                ->orWhere('prenom', 'like', $searchTerm)
                ->orWhereHas('organisation', function ($query) use ($searchTerm) {
                    $query->where('nom', 'like', $searchTerm);
                });
        }

        return $query;
    }
}
