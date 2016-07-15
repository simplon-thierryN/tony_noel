<?php
header("Content-Type: application/json");
$pdo = new PDO('mysql:host=localhost;dbname=photos', 'root','root');

$monaction = isset($_GET["action"]) ? $_GET["action"] : false;

if(!$monaction){
  $req=$pdo->prepare("SELECT * FROM pictures LEFT JOIN albums ON pictures.album_id=albums.id ORDER BY RAND()" );
  $req->execute();
  $donnees=$req->fetchAll(PDO::FETCH_ASSOC);
  $encodedData = array_walk_recursive($donnees, function(&$value){$value = utf8_encode($value);});
  echo json_encode(  $donnees );
}

elseif ($monaction=="albums") {
  $req=$pdo->prepare("SELECT * FROM albums WHERE id=2 OR id=4 OR id=10 OR id=3 OR id=12 OR id=13 OR id=17");
  $req->execute();
  $donnees=$req->fetchAll(PDO::FETCH_ASSOC);
  echo json_encode($donnees);
}

elseif ($monaction=="lyon") {
  $req=$pdo->prepare("SELECT * FROM albums WHERE id=5 OR id=6 OR id=7 OR id=8 OR id=9");
  $req->execute();
  $donnees=$req->fetchAll(PDO::FETCH_ASSOC);
  echo json_encode($donnees);
}

elseif ($monaction=="viagem") {
  $req=$pdo->prepare("SELECT * FROM albums WHERE id=14 OR id=15 OR id=16 ");
  $req->execute();
  $donnees=$req->fetchAll(PDO::FETCH_ASSOC);
  echo json_encode($donnees);
}
?>
