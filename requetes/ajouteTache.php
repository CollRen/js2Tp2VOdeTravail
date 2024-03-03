<?php
require_once('functions.php');

$request_payload = file_get_contents('php://input');
$data = json_decode($request_payload, true);

if (isset($data['tache']) && isset($data['description']) && isset($data['importance'])) {


    $tache = htmlspecialchars($data['tache']);
    $description = htmlspecialchars($data['description']);
    $importance = htmlspecialchars($data['importance']);

    $return_id = ajouteTache($tache, $description, $importance);
    echo $return_id;
} else {
    echo 'Erreur query string';
}
