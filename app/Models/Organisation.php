<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Organisation extends Model
{
    use HasFactory;

    protected $fillable = [
        'cle',
        'nom',
        'adresse',
        'code_postal',
        'ville',
        'statut',
    ];    

    public function contacts(){
        return $this->hasMany(Contact::class);
    }
}
