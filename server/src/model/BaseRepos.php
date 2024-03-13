<?php 

require_once('../config/ConnectDB.php');

class BaseRepos {
	protected $error;

	function getError() {
		return $this->error;
	}
}