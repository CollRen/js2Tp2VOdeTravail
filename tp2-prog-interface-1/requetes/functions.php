<?php
$connexion = connexionDB();

/**
 * Connection avec la base de données
 */
function connexionDB()
{
	define('DB_HOST', 'localhost');
	define('DB_USER', 'root');
	define('DB_PASSWORD', 'root');			// MAC
	//define('DB_PASSWORD', '');			// Windows

	$laConnexion = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD);

	if (!$laConnexion) {
		// La connexion n'a pas fonctionné
		die('Erreur de connexion à la base de données. ' . mysqli_connect_error());
	}

	$db = mysqli_select_db($laConnexion, 'to-do-list');

	if (!$db) {
		die('La base de données n\'existe pas.');
	}

	mysqli_query($laConnexion, 'SET NAMES "utf8"');
	return $laConnexion;
}


/**
 * Exécute la requête SQL
 * Si le paramètre $insert est true, retourne l'id de la ressource ajoutée à la db
 */
function executeRequete($requete, $insert = false)
{
	global $connexion;
	if ($insert) {
		mysqli_query($connexion, $requete);
		$resultats = $connexion->insert_id;
	} else {
		$resultats = mysqli_query($connexion, $requete);
	}
	return $resultats;
}


/**
 * Retourne la liste des tâches
 */
function getAllTaches()
{
	return executeRequete("SELECT * FROM taches");
}

/**
 * Retourne la liste des tâches trié ASC
 */
function getAllTachesSort($sort)
{
	return executeRequete("SELECT * FROM taches ORDER BY $sort");
}

/**
 * Ajoute la nouvelle tâche
 */
function ajouteTache($tache, $description, $importance)
{
	$query = "INSERT INTO taches (`tache`, `description`, `importance`) 
				  VALUES ('" . $tache . "','" . $description . "','" . $importance . "')";
	return executeRequete($query, true);
}


/**
 * Change le nom d'une tâhce spécifiée en paramètre
 */
function changeNomTache($nom_tache, $id_tache)
{
	global $connexion;
	$nom_tache = mysqli_real_escape_string($connexion, $nom_tache);
	$id_tache = mysqli_real_escape_string($connexion, $id_tache);

	return executeRequete("UPDATE taches 
							   SET nom = '$nom_tache' 
							   WHERE id ='$id_tache'");
}


/**
 * Supprime l'tâche spécifiée en paramètre
 */
function supprimeTache($id_tache)
{
	global $connexion;
	$id_tache = mysqli_real_escape_string($connexion, $id_tache);

	return executeRequete("DELETE FROM taches WHERE id = " . $id_tache);
}

/**
 * Change le nom d'une tâhce spécifiée en paramètre
 */
function getTacheDetail($id_tache)
{
	global $connexion;
	$id_tache = mysqli_real_escape_string($connexion, $id_tache);

	return executeRequete("SELECT * FROM taches WHERE id = " . $id_tache);
}
