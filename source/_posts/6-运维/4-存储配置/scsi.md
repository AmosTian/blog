## targetcli块设备

服务端配置

```shell
[root@node205]# yum install -y targetcli

[root@node205]# systemctl enable --now target

[root@node205 yum.repos.d]# targetcli
Warning: Could not load preferences file /root/.targetcli/prefs.bin.
targetcli shell version 2.1.54
Copyright 2011-2013 by Datera, Inc and others.
For help on commands, type 'help'.

/> ls
o- / ......................................................................................................................... [...]
  o- backstores .............................................................................................................. [...]
  | o- block .................................................................................................. [Storage Objects: 0]
  | o- fileio ................................................................................................. [Storage Objects: 0]
  | o- pscsi .................................................................................................. [Storage Objects: 0]
  | o- ramdisk ................................................................................................ [Storage Objects: 0]
  o- iscsi ............................................................................................................ [Targets: 0]
  o- loopback ......................................................................................................... [Targets: 0]
  o- vhost ............................................................................................................ [Targets: 0]
  o- xen-pvscsi ....................................................................................................... [Targets: 0]
/> cd backstores/
/> backstores/block create
/> cd backstores/ramdisk 
/backstores/ramdisk> create name=rd1 size=10G
Created ramdisk rd1 with size 10G.
/backstores/ramdisk> cd /
/> cd iscsi 
/iscsi> create iqn.2025-09.com.example:ram.target
Created target iqn.2025-09.com.example:ram.target.
Created TPG 1.
Global pref auto_add_default_portal=true
Created default portal listening on all IPs (0.0.0.0), port 3260.
/iscsi> ls
o- iscsi .............................................................................................................. [Targets: 1]
  o- iqn.2025-09.com.example:ram.target .................................................................................. [TPGs: 1]
    o- tpg1 ................................................................................................. [no-gen-acls, no-auth]
      o- acls ............................................................................................................ [ACLs: 0]
      o- luns ............................................................................................................ [LUNs: 0]
      o- portals ...................................................................................................... [Portals: 1]
        o- 0.0.0.0:3260 ....................................................................................................... [OK]
/iscsi> cd /
/> ls
o- / ......................................................................................................................... [...]
  o- backstores .............................................................................................................. [...]
  | o- block .................................................................................................. [Storage Objects: 0]
  | o- fileio ................................................................................................. [Storage Objects: 0]
  | o- pscsi .................................................................................................. [Storage Objects: 0]
  | o- ramdisk ................................................................................................ [Storage Objects: 1]
  |   o- rd1 ............................................................................................... [(10.0GiB) deactivated]
  |     o- alua ................................................................................................... [ALUA Groups: 1]
  |       o- default_tg_pt_gp ....................................................................... [ALUA state: Active/optimized]
  o- iscsi ............................................................................................................ [Targets: 1]
  | o- iqn.2025-09.com.example:ram.target ................................................................................ [TPGs: 1]
  |   o- tpg1 ............................................................................................... [no-gen-acls, no-auth]
  |     o- acls .......................................................................................................... [ACLs: 0]
  |     o- luns .......................................................................................................... [LUNs: 0]
  |     o- portals .................................................................................................... [Portals: 1]
  |       o- 0.0.0.0:3260 ..................................................................................................... [OK]
  o- loopback ......................................................................................................... [Targets: 0]
  o- vhost ............................................................................................................ [Targets: 0]
  o- xen-pvscsi ....................................................................................................... [Targets: 0]
/> cd iscsi/iqn.2025-09.com.example:ram.target/tpg1/
iscsi/iqn.2025-09.com.example:ram.target/tpg1/acls/     iscsi/iqn.2025-09.com.example:ram.target/tpg1/luns/     
iscsi/iqn.2025-09.com.example:ram.target/tpg1/portals/  
/> cd iscsi/iqn.2025-09.com.example:ram.target/tpg1/luns 
/iscsi/iqn.20...get/tpg1/luns> create /backstores/ramdisk/rd1 
Created LUN 0.
/iscsi/iqn.20...get/tpg1/luns> cd /iscsi/iqn.2025-09.com.example:ram.target/tpg1/acls 
/iscsi/iqn.20...get/tpg1/acls> create iqn.2025-09.com.example:initiator01
Created Node ACL for iqn.2025-09.com.example:initiator01
Created mapped LUN 0.
/iscsi/iqn.20...get/tpg1/acls> cd /iscsi/iqn.2025-09.com.example:ram.target/tpg1/portals/
/iscsi/iqn.20.../tpg1/portals> delete 
0.0.0.0      ip_address=  ip_port=     
/iscsi/iqn.20.../tpg1/portals> delete 0.0.0.0 3260 
Deleted network portal 0.0.0.0:3260
/iscsi/iqn.20.../tpg1/portals> create 10.152.1.205 3260
Using default IP port 3260
Created network portal 10.152.1.205:3260.
/iscsi/iqn.20.../tpg1/portals> cd /
/> saveconfig 
Configuration saved to /etc/target/saveconfig.json
/> exit
Global pref auto_save_on_exit=true
Last 10 configs saved in /etc/target/backup/.
Configuration saved to /etc/target/saveconfig.json

```











## scst



```shell
rpm -i scst-4.19.90-52.23.v2207.gfb08.ky10.aarch64-3.7.0-1.ky10.src.rpm

cd ~/rpmbuild/SOURCES/

tar -xvf scst-3.7.0.tar.bz2 -C /root/dl

cd ~/dl/scst-3.7.0/

make clean
make scst -j
make iscsi -j
make scstadm -j

make scst_install
make iscsi_install
make scstadm_install


cd /root/dl/scst-3.7.0/scst/src/dev_handlers

vim Kbuild
obj-m := scst_cdrom.o scst_changer.o scst_disk.o scst_modisk.o scst_tape.o \
         scst_raid.o scst_processor.o scst_user.o scst_vdisk.o

make

cp scst_vdisk.ko /lib/modules/4.19.90-52.23.v2207.gfb01.ky10.aarch64/

depmod

# 改为本机IP，仅第一次需要操作
vim /roor/dl/scst_config



modprobe brd rb_nr=1 rd_size=16777216 max_part=0

modprobe scst_vdisk
modprobe iscsi-scst
iscsi-scstd
scstadmin -config /root/dl/scst_config




chmod +x /etc/rc.d/rc.local

vim /etc/rc.local
```







```shell
iscsiadm -m node -T iqn.2025-09.local:ramdisk.target -p 10.152.1.205 --logout


```

