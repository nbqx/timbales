spawn = require \child_process .spawn

task \build 'build lib' ->
  sources = for file in dir \src
    \src/ + file
  proc = spawn \livescript [\-bco \lib] +++ sources
  proc.stderr.on \data say
  proc.on \exit -> process.exit it if it