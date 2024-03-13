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
} elseif (isset($data['id']) && $data['action'] == 'getTacheDetail') {

    // Va chercher toutes l'informations d'un tache

    $id = htmlspecialchars($data['id']);
    $data_reponse = array();
    $detailsTache = getTacheDetail($id);
    // Récupérer la ligne suivante d'un ensemble de résultats sous forme de tableau associatif
    while ($detailTache = mysqli_fetch_assoc($detailsTache)) {
        $data_reponse[] = $detailTache;
    }
    echo json_encode($data_reponse);

} elseif (isset($data['sort']) && $data['action'] == 'getTachesTriees') {

    // Va chercher toutes l'informations d'un tache

    $sort = htmlspecialchars($data['sort']);
    $data_reponse = array();
    $tachesTriees = getAllTachesSort($sort);
    // Récupérer la ligne suivante d'un ensemble de résultats sous forme de tableau associatif
    while ($tacheTriee = mysqli_fetch_assoc($tachesTriees)) {
        $data_reponse[] = $tacheTriee;
    }
    echo json_encode($data_reponse);

} else {
    echo 'Erreur query string';
}
