<?php
require_once('functions.php');

$request_payload = file_get_contents('php://input');
$data = json_decode($request_payload, true);

if (isset($data['tache']) && isset($data['description']) && isset($data['importance']) && $data['action'] == 'ajouteTache') {

    //Ajouter tâche
    if (isset($data['tache']) && isset($data['description']) && isset($data['importance'])) {
    
    
        $tache = htmlspecialchars($data['tache']);
        $description = htmlspecialchars($data['description']);
        $importance = htmlspecialchars($data['importance']);
    
        $return_id = ajouteTache($tache, $description, $importance);
        echo $return_id;
    } else {
        echo 'Erreur query string';
    }
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

