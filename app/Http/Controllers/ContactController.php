<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use App\Models\Organisation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $column = $request->input('column');
        $order = $request->input('order');

        $contacts = Contact::with('organisation')
            ->filter(['search' => $request->input('search')]);

        if (empty($column) && empty($order)) {
            $contacts = $contacts->latest()->paginate(10);
        } else {
            $contacts = $contacts->orderBy($column, $order)->paginate(10);
        }

        return Inertia::render("Index", [
            'contacts' => $contacts,
            'order' => $order,
            'allContacts' => Contact::get(),
            'allOrganisations' => Organisation::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nom' => 'required|alpha',
            'prenom' => 'required|alpha',
            'email' => 'required|email',
            'organisation' => 'required|alpha_num',
            'adresse' => 'required',
            'code_postal' => 'required|numeric',
            'ville' => 'required',
            'statut' => 'required',
        ]);
        
        $organisation = Organisation::create([
            'cle' => bin2hex(random_bytes(16)),
            'nom' => strtoupper($validatedData['organisation']),
            'adresse' => $validatedData['adresse'],
            'code_postal' => $validatedData['code_postal'],
            'ville' => strtoupper($validatedData['ville']),
            'statut' => $validatedData['statut'],
        ]);

        Contact::create([
            'cle' => bin2hex(random_bytes(16)),
            'nom' => strtoupper($validatedData['nom']),
            'prenom' => strtoupper($validatedData['prenom']),
            'e_mail' => strtolower($validatedData['email']),
            'organisation_id' => $organisation->id,
        ]);

        return to_route('contacts.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Contact $contact)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Contact $contact)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Contact $contact)
    {
        $validatedData = $request->validate([
            'nom' => 'required|alpha',
            'prenom' => 'required|alpha',
            'email' => 'required|email',
            'organisation' => 'required|alpha_num',
            'adresse' => 'required',
            'code_postal' => 'required|numeric',
            'ville' => 'required',
            'statut' => 'required',
        ]);
    
        $contact->update([
            'nom' => strtoupper($validatedData['nom']),
            'prenom' => strtoupper($validatedData['prenom']),
            'e_mail' => strtolower($validatedData['email']),
        ]);
    
        $contact->organisation->update([
            'nom' => strtoupper($validatedData['organisation']),
            'adresse' => $validatedData['adresse'],
            'code_postal' => $validatedData['code_postal'],
            'ville' => strtoupper($validatedData['ville']),
            'statut' => strtoupper($validatedData['statut']),
        ]);

        return to_route('contacts.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Contact $contact)
    {
        $contact->delete();
        return to_route('contacts.index');
    }
}
