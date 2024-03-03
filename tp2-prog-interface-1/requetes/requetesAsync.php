<?php
require_once('functions.php');

$request_payload = file_get_contents('php://input');
$data = json_decode($request_payload, true);

if (isset($data['nom']) && isset($data['quartier']) && $data['action'] == 'ajouteEquipe') {

    //Ajouter équipe
    $nom = htmlspecialchars($data['nom']);
    $quartier = htmlspecialchars($data['quartier']);

    $return_id = ajouteEquipe($nom, $quartier);
    echo $return_id;
} else if (isset($data['nom']) && isset($data['id']) && $data['action'] == 'edit') {

    // Change nom équipe
    $nom = htmlspecialchars($data['nom']);
    $id = htmlspecialchars($data['id']);

    changeNomEquipe($nom, $id);
    echo $nom;
} elseif (isset($data['id']) && $data['action'] == 'delete') {

    // Supprime équipe
    $id = htmlspecialchars($data['id']);
    supprimeEquipe($id);

    echo $id;
} else {
    echo 'Erreur query string';
}
