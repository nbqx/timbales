Drum = this.Drum || {};

Drum.bd = function(vol){
  var es = T("ease","back.inout",5000,100,800).kr();
  var osc = T("saw", 100, 4.0);
  osc = T("*", T("pink",0.9), osc);
  osc = T("clip",-0.8,0.8,osc);
  osc = T("rlpf", 100, 0.8, osc);
  var env = T("adsr",0,80,0.0,130).set("mul",vol);
  env.s = 160;
  var s = T("*", osc, env).play();
  env.bang();
  env.onended = function(){
    s.pause();
  };
};

Drum.sd = function(vol){
  var osc = T("noise");
  osc = T("+", osc, T("*",T("pulse",30), 0.3));
  osc = T("rhpf", 2600, 0.6, osc);
  var env = T("adsr",0,180,0.1).set("mul",vol);
  env.s = 100;
  var s = T("*", osc, env.bang()).play();
  env.onended = function(){
    s.pause();
  };
};

Drum.hh = function(vol,dur){
  var dur = (dur===undefined)? 100 : dur;
  var osc = T("noise");
  osc = T("rhpf", 12000, 0.8, osc);
  var env = T("perc", dur).set("mul",vol);
  var s = T("*",osc,env.bang()).play();
  env.onended = function(){
    s.pause();
  }
};

Drum.play = function(freq,vol){
  Drum.bd(vol);
  Drum.sd(vol);
};

Drum.bd_loop = Basis.genLoopFn("bd_seq");
Drum.sd_loop = Basis.genLoopFn("sd_seq");
Drum.hh_loop = Basis.genLoopFn("hh_seq");

var seq = {
  bd: [
    [16,Drum.bd,[0.8]],
    [16,Drum.bd,[0.8]],
    [8,Drum.bd,[0.0]],
    [16,Drum.bd,[0.0]],
    [8,Drum.bd,[0.8]],
    [16,Drum.bd,[0.8]],
    [16,Drum.bd,[0.8]],
    [16,Drum.bd,[0.8]],
    [8,Drum.bd,[0.0]],
    [16,Drum.bd,[0.0]],
    [8,Drum.bd,[0.8]],
    [16,Drum.bd,[0.8]]
  ],
  sd: [
    [8,Drum.sd,[0.0]],
    [8,Drum.sd,[0.8]],
    [4,Drum.sd,[0.8]],
    [8,Drum.sd,[0.0]],
    [8,Drum.sd,[0.8]],
    [4,Drum.sd,[0.8]]
  ],
  hh: [
    [8,Drum.hh,[0.0,80]],
    [8,Drum.hh,[0.8,80]],
    [8,Drum.hh,[0.0,30]],
    [8,Drum.hh,[0.8,30]],
    [8,Drum.hh,[0.0,30]],
    [16,Drum.hh,[0.8,30]],
    [16,Drum.hh,[0.8,30]],
    [8,Drum.hh,[0.0,0]],
    [8,Drum.hh,[0.8,200]]
  ]
};

var metro = new Metro(80);

Drum.bd_seq = seq.bd;
Drum.sd_seq = seq.sd;
Drum.hh_seq = seq.hh;

metro.add('test', function(i){
  var cnt = i.count%4;
  if(cnt===0){
    Drum.bd_loop();
    Drum.sd_loop();
    Drum.hh_loop();
  }
});

metro.run();