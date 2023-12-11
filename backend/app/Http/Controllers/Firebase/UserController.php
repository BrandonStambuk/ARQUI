<?php

namespace App\Http\Controllers\Firebase;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Kreait\Firebase\Database;
use Kreait\Laravel\Firebase\Facades\Firebase;


class UserController extends Controller
{
    //
    public function register(Request $request)
    {
        $email = $request->input('email');
        $password = $request->input('password');

        try {
            // Verifica si el usuario ya existe
            $existingUser = Firebase::auth()->getUserByEmail($email);

            return response()->json(['error' => 'User already exists'], 422);
        } catch (\Kreait\Firebase\Exception\Auth\UserNotFound $e) {
            // El usuario no existe, procede con el registro
            try {
                $userProperties = [
                    'email' => $email,
                    'password' => $password,
                ];

                // Crea el usuario en Firebase Authentication
                $userRecord = Firebase::auth()->createUser($userProperties);

                // Puedes realizar acciones adicionales después del registro
                // ...

                return response()->json(['message' => 'User registered successfully']);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Registration error'], 500);
            }
        }
    }
}
