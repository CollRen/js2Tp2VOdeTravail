<?php
require_once('functions.php');

$request_payload = file_get_contents('php://input');
$data = json_decode($request_payload, true);

if (isset($data['nom']) && isset($data['quartier']) && $data['action'] == 'ajouteTache') {

    //Ajouter tâche
    $nom = htmlspecialchars($data['nom']);
    $quartier = htmlspecialchars($data['quartier']);

    $return_id = ajouteTache($nom, $quartier);
    echo $return_id;
} else if (isset($data['nom']) && isset($data['id']) && $data['action'] == 'edit') {

    // Change nom tâche
    $nom = htmlspecialchars($data['nom']);
    $id = htmlspecialchars($data['id']);

    changeNomTache($nom, $id);
    echo $nom;
} elseif (isset($data['id']) && $data['action'] == 'supprimer') {

    // Supprime tâche
    $id = htmlspecialchars($data['id']);
    supprimeTache($id);

    echo $id;
} else {
    echo 'Erreur query string';
}
