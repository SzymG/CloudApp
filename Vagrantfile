Vagrant.configure("2") do |config|

  config.vm.define "db" do |db|
	db.vm.box = "archlinux/archlinux"
	db.vm.provision "apache", type: "ansible_local", playbook: "playbook_db.yml"
	db.vm.network "private_network", ip: "192.168.10.13"
	db.vm.hostname = "db"
	db.vm.provider :virtualbox do |vb|
      vb.customize ["modifyvm", :id, "--memory", "2048"] 
      vb.customize ["modifyvm", :id, "--cpus", "2"]
    end
  end
  
  config.vm.define "back" do |back|
	back.vm.box = "archlinux/archlinux"
	back.vm.provision "apache", type: "ansible_local", playbook: "playbook_back.yml"
	back.vm.network :forwarded_port, :guest => 3000, :host => 8081, :host_ip => "127.0.0.1"
	back.vm.network "private_network", ip: "192.168.10.12"
	back.vm.hostname = "back"
  end
  
  config.vm.define "front" do |front|
	front.vm.box = "archlinux/archlinux"
	front.vm.provision "apache", type: "ansible_local", playbook: "playbook_front.yml"
	front.vm.network :forwarded_port, :guest => 8000, :host => 8080, :host_ip => "127.0.0.1"
	front.vm.network "private_network", ip: "192.168.10.11"
	front.vm.hostname = "front"
  end


end