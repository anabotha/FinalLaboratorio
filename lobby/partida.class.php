<?php

class Partida
{
     public $j1;
     public $j2;
     public $ganadasComunJ1;
     public $ganadasComunJ2;
     public $ganadasIndivJ1;
     public $ganadasIndivJ2;
     public $primeroActual; // primer turno actual
     public $partidasTotales;
     public $ultimaPartida;
     public $ultimoGanador;

     // Getter
     public function getUltimoGanador() {
          return $this->ultimoGanador;
     }

     // Setter
     public function setUltimoGanador($ganador) {
          $this->ultimoGanador = $ganador;
     }

     // Getter
     public function getUltimaPartida() {
          return $this->ultimaPartida;
     }

     // Setter
     public function setUltimaPartida(DateTime $fecha) {
          $this->ultimaPartida = $fecha;
     }

     public function __construct() {
          $this->j1 = null;
          $this->j2 = null;
          $this->ganadasComunJ1 = 0;
          $this->ganadasComunJ2 = 0;
          $this->ganadasIndivJ1 = 0;
          $this->ganadasIndivJ2 = 0;
          $this->primeroActual = null;
          $this->partidasTotales = 0;
          $this->ultimaPartida=null;
     }

     public function getJ1() { return $this->j1; }
     public function getJ2() { return $this->j2; }
     public function getGanadasComunJ1() { return $this->ganadasComunJ1; }
     public function getGanadasComunJ2() { return $this->ganadasComunJ2; }
     public function getGanadasIndivJ1() { return $this->ganadasIndivJ1; }
     public function getGanadasIndivJ2() { return $this->ganadasIndivJ2; }
     public function getPrimeroActual() { return $this->primeroActual; }
     public function getpartidasTotales() { return $this->partidasTotales; }

     // Setters
     public function setJ1($j1) { $this->j1 = $j1; }
     public function setJ2($j2) { $this->j2 = $j2; }
     public function setGanadasComunJ1($wins) { $this->ganadasComunJ1 = $wins; }
     public function setGanadasComunJ2($wins) { $this->ganadasComunJ2 = $wins; }
     public function setGanadasIndivJ1($wins) { $this->ganadasIndivJ1 = $wins; }
     public function setGanadasIndivJ2($wins) { $this->ganadasIndivJ2 = $wins; }
     public function setPrimeroActual($player) { $this->primeroActual = $player; }
     public function setpartidasTotales($jugadas) { $this->partidasTotales = $jugadas; }

     // Helper methods
     public function getTotalWinsJ1() {
          return $this->ganadasComunJ1 + $this->ganadasIndivJ1;
     }

     public function getTotalWinsJ2() {
          return $this->ganadasComunJ2 + $this->ganadasIndivJ2;
     }

     public function getWinRateJ1() {
          $total = $this->getTotalWinsJ1() + $this->getTotalWinsJ2();
          return $total > 0 ? round(($this->getTotalWinsJ1() / $total) * 100, 1) : 0;
     }

     public function getWinRateJ2() {
          $total = $this->getTotalWinsJ1() + $this->getTotalWinsJ2();
          return $total > 0 ? round(($this->getTotalWinsJ2() / $total) * 100, 1) : 0;
     }
}

?>