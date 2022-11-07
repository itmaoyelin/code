{
    let name = "",company="",title="",address="",mobile="",email="",web="",desc="";
    let $ = dom => document.querySelector(dom);

    document.querySelector('.b_login').onclick = ()=>{
       
        if($("#name").value.length > 1){
            name = "FN:"+$("#name").value + "\n";
            console.log(name);
		}
		if($("#company").value.length > 1){
			company = "ORG:"+ $("#company").value + "\n";
		}
		if($("#title").value.length > 1){
			title = "TITLE:"+$("#title").value + "\n";
		}
		if($("#address").value.length > 1){
			address = "ADR;WORK:"+$("#address").value + "\n";
		}
		if($("#mobile").value.length > 1){
			mobile = "TEL;WORK:"+$("#mobile").value + "\n";
		}
		if($("#email").value.length > 1){
			email = "EMAIL;WORK:"+$("#email").value + "\n";
		}
		if($("#web").value.length > 1){
			web = "URL:"+$("#web").value + "\n";
		}
		if($("#desc").value.length > 1){
			desc = "NOTE:"+$("#desc").value + "\n";
        }
        $("#qrcode").innerHTML = '';
        let info = "BEGIN:VCARD\n"+name+company+title+address+mobile+email+web+desc+"END:VCARD";
        let qrcode = new QRCode('qrcode');
        qrcode.makeCode(info);
    }
}