// import React, { useMemo, useState } from 'react';
// import {
//   Alert,
//   Box,
//   Button,
//   Chip,
//   Paper,
//   Stack,
//   Typography,
//   BottomNavigation,
//   BottomNavigationAction,
// } from '@mui/material';
// import WorkIcon from '@mui/icons-material/Work';
// import FormatListBulletedAddIcon from '@mui/icons-material/FormatListBulletedAdd';

// import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
// import CloseIcon from '@mui/icons-material/Close';
// import { useLocales } from './providers/LocaleProvider';
// import { useVisibility } from './providers/VisibilityProvider';
// import { fetchNui } from './utils/fetchNui';
// import { isEnvBrowser } from './utils/misc';
// import { WidthFull } from '@mui/icons-material';

// function App() {
//   const { locale } = useLocales();
//   const { setVisible } = useVisibility();
//   const [money, setMoney] = useState<number | null>(null);
//   const [value, setValue] = React.useState(0);

//   const labels = useMemo(
//     () => ({
//       title: locale.ui_playerMoney || 'Player Money',
//       button: locale.ui_buttonText || 'Get Player Money',
//       reset: locale.ui_reset || 'Reset',
//     }),
//     [locale]
//   );




//   const getMoney = async () => {
//     try {
//       const playerMoney = await fetchNui<number>('getPlayerMoney', {}, 2500);
//       setMoney(playerMoney);
//     } catch {
//       // Keep UI responsive even if callback is not yet implemented server-side.
//       setMoney(0);
//     }
//   };

//   const closeUi = async () => {
//     if (isEnvBrowser()) {
//       setVisible(false);
//       return;
//     }

//     await fetchNui('hide-ui');
//   };

//   return (
//     <Box className="screen">
//       <Paper elevation={8} className="panel">
//         <Stack direction="row" justifyContent="space-between" alignItems="center">
//           <Typography variant="h5" fontWeight={700}>
//             FiveM MUI Example
//           </Typography>
//           <Button variant="text" color="inherit" startIcon={<CloseIcon />} onClick={closeUi}>
//             Close
//           </Button>
//         </Stack>

//         <Alert severity="info" sx={{ mt: 2 }}>
//           Open this panel with <strong>/showui</strong>. Press <strong>ESC</strong> to close.
//         </Alert>

//         <Stack spacing={2} sx={{ mt: 3 }}>
//           <Typography variant="body1">{labels.title}</Typography>
//           <Chip
//             icon={<AttachMoneyIcon />}
//             label={money === null ? 'Not loaded' : `$${money.toLocaleString()}`}
//             color="primary"
//             variant="outlined"
//           />
//           <Stack direction="row" spacing={1}>
            
//             <Button variant="contained" onClick={getMoney}>
//               {labels.button}
//             </Button>
//             <Button variant="outlined" onClick={() => setMoney(null)}>
//               {labels.reset}
//             </Button>
//           </Stack>
//            <BottomNavigation
//              sx={{ mt: 2 }}
         
//         showLabels
//         value={value}
//         onChange={(event, newValue) => {
//           setValue(newValue);
//         }}
//       >
//         <BottomNavigationAction label="Job" icon={<WorkIcon />} />
//         <BottomNavigationAction label="List" icon={<FormatListBulletedAddIcon />} />

//       </BottomNavigation>
//         </Stack>
//       </Paper>
//     </Box>
//   );
// }

// export default App;

// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   BottomNavigation,
//   BottomNavigationAction,
//   Paper,
//   Chip,
//   IconButton,
//   Switch,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button
// } from "@mui/material";

// import RestoreIcon from "@mui/icons-material/Restore";
// import WorkIcon from "@mui/icons-material/Work";
// import DeleteIcon from "@mui/icons-material/Delete";

// /* -------------------------------------------------- */
// /* TYPES                                              */
// /* -------------------------------------------------- */

// interface PlayerData {
//   job: string;
//   label: string;
//   grade: string;
//   onduty: boolean;
// }

// interface Job {
//   name: string;
//   label: string;
// }

// interface NuiMessage {
//   action: string;
//   job?: string;
//   label?: string;
//   grade?: string;
//   onduty?: boolean;
//   jobs?: Job[];
// }

// /* -------------------------------------------------- */
// /* NUI / BROWSER HANDLER                              */
// /* -------------------------------------------------- */

// const isEnvBrowser = !(window as any).invokeNative;

// const fetchNui = async (event: string, data: any = {}): Promise<void> => {
//   if (isEnvBrowser) {
//     console.log("NUI CALLBACK →", event, data);

//     if (event === "selectJob") {
//       window.postMessage({
//         action: "setPlayer",
//         job: data.job,
//         label: data.job.charAt(0).toUpperCase() + data.job.slice(1),
//         grade: "Employee",
//         onduty: false
//       }, "*");
//     }

//     if (event === "toggleDuty") {
//       window.postMessage({
//         action: "setPlayer",
//         job: data.job,
//         label: data.job.charAt(0).toUpperCase() + data.job.slice(1),
//         grade: "Employee",
//         onduty: Math.random() > 0.5
//       }, "*");
//     }

//     if (event === "deleteJob") {
//       alert("Job removed (mock)");
//     }

//     return;
//   }

//   await fetch(`https://${(window as any).GetParentResourceName()}/${event}`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json; charset=UTF-8" },
//     body: JSON.stringify(data),
//   });
// };

// /* -------------------------------------------------- */
// /* JOB DETAILS                                        */
// /* -------------------------------------------------- */

// const JobDetails: React.FC<{ player: PlayerData | null }> = ({ player }) => {
//   const [confirmOpen, setConfirmOpen] = useState(false);

//   if (!player)
//     return <Typography color="gray" mt={3}>Waiting for player data...</Typography>;

//   return (
//     <>
//       <Paper sx={{ mt:4, p:2, bgcolor:"#25252b", borderRadius:2, color:"white",  height:330,
//           pr:1, }}>
//         <Typography variant="h6">Current Job</Typography>

//         <Typography mt={2}><b>{player.label}</b></Typography>
//         <Box sx={{ display:"flex", alignItems:"center", gap:1, mt:1 }}>
//           <Typography color="gray">{player.grade}</Typography>

//           <Chip
//             label={player.onduty ? "On Duty" : "Off Duty"}
//             color={player.onduty ? "success" : "error"}
//             size="small"
//           />
//         </Box>

//         <Box mt={2} display="flex" alignItems="center" justifyContent="space-between">
//           <Typography>Duty</Typography>
//           <Switch
//             checked={player.onduty}
//             onChange={() => fetchNui("toggleDuty", { job: player.job })}
//             color="success"
//           />
//            <IconButton color="error" onClick={() => setConfirmOpen(true)}>
//             <DeleteIcon/>
//           </IconButton>
//         </Box>
//         <Box   sx={{  p:2, bgcolor:"#25252bf8", borderRadius:1, color:"white",   pl:13, }}>
//            <Typography>Hours : 00:00 </Typography> 
//         </Box>
//   <br></br>
//         <Box   sx={{  p:2, bgcolor:"#25252bfd", borderRadius:1, color:"white",   pl:15, }}>
//            <Typography>Active : 3 </Typography> 
//         </Box>
//       </Paper>

//       <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
//         <DialogTitle>Remove Job</DialogTitle>
//         <DialogContent>
//           Are you sure you want to remove <b>{player.label}</b>?
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
//           <Button color="error" onClick={() => fetchNui("deleteJob", { job: player.job })}>
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// /* -------------------------------------------------- */
// /* JOB LIST                                           */
// /* -------------------------------------------------- */

// const JobList: React.FC<{ jobs: Job[]; player: PlayerData | null }> = ({ jobs, player }) => {
//   const [deleteTarget, setDeleteTarget] = useState<Job | null>(null);

//   if (!jobs.length)
//     return <Typography color="gray" mt={3}>Loading jobs...</Typography>;

//   return (
//     <>
//       <Box
//         mt={3}
//         sx={{
//           height:330,
//           overflowY:"auto",
//           pr:1,
//           "&::-webkit-scrollbar": { width:"6px" },
//           "&::-webkit-scrollbar-thumb": { background:"#afbe1f9a", borderRadius:"10px" }
//         }}
//       >
//         {jobs.map(job=>{
//           const active = player?.job === job.name;

//           return (
//             <Box
//               key={job.name}
//               sx={{
//                 display:"flex",
//                 alignItems:"center",
//                 justifyContent:"space-between",
//                 p:2,
//                 mb:1,
//                 bgcolor: active ? "#1f3a2a" : "#242321",
//                 border: active ? "1px solid #4caf50" : "1px solid transparent",
//                 color:"white",
//                 borderRadius:1,
//                 cursor:"pointer",
//                 "&:hover":{ bgcolor: active ? "#244632" : "#31313a" }
//               }}
//             >
//               <Box sx={{flex:1}} onClick={()=>!active && fetchNui("selectJob",{job:job.name})}>
//                 <Typography>
//                   {job.label} {active && <Chip label="ACTIVE" size="small" color="success" sx={{ ml:1 }}/>}
//                 </Typography>
//               </Box>

//               {!active && (
//                 <IconButton
//                   size="small"
//                   color="error"
//                   onClick={(e)=>{
//                     e.stopPropagation();
//                     setDeleteTarget(job);
//                   }}
//                 >
//                   <DeleteIcon fontSize="small"/>
//                 </IconButton>
//               )}
//             </Box>
//           );
//         })}
//       </Box>

//       <Dialog open={!!deleteTarget} onClose={()=>setDeleteTarget(null)}>
//         <DialogTitle>Remove Job</DialogTitle>
//         <DialogContent>
//           Delete <b>{deleteTarget?.label}</b> from saved jobs?
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={()=>setDeleteTarget(null)}>Cancel</Button>
//           <Button color="error" onClick={()=>fetchNui("deleteJob",{job:deleteTarget?.name})}>
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// /* -------------------------------------------------- */
// /* MAIN APP                                           */
// /* -------------------------------------------------- */

// export function App() {
//   const [tab,setTab] = useState<number>(0);
//   const [player,setPlayer] = useState<PlayerData | null>(null);
//   const [jobs,setJobs] = useState<Job[]>([]);

//   useEffect(()=>{
//     const handler = (event: MessageEvent<NuiMessage>)=>{
//       const data = event.data;
//       if(data.action==="setPlayer") setPlayer(data as PlayerData);
//       if(data.action==="setJobs" && data.jobs) setJobs(data.jobs);
//     };

//     window.addEventListener("message",handler);

//     if(isEnvBrowser){
//       setTimeout(()=>{
//         setPlayer({ job:"police", label:"Police", grade:"Sergeant", onduty:true });
//         setJobs([
//           { name:"unemployed", label:"Unemployed" },
//           { name:"police", label:"Police" },
//           { name:"ambulance", label:"Ambulance" },
//           { name:"mechanic", label:"Mechanic" },
//           { name:"taxi", label:"Taxi Driver" },
//           { name:"realestate", label:"Real Estate" },
//           { name:"cardealer", label:"Car Dealer" },
//           { name:"lawyer", label:"Lawyer" },
//           { name:"judge", label:"Judge" },
//           { name:"reporter", label:"Reporter" }
//         ]);
//       },500);
//     } else {
//       fetchNui("nuiReady");
//     }

//     return ()=>window.removeEventListener("message",handler);
//   },[]);

//   useEffect(()=>{
//     if(tab===1 && !isEnvBrowser){
//       fetchNui("requestJobs");
//     }
//   },[tab]);

//   return (
//     <Box
//   sx={{
//     position: "fixed",
//     top: "50%",
//     left: 40,
//     transform: "translateY(-50%)",
//   }}
// >
//   <Box sx={{ p:2, width:380, height:420, bgcolor:"#212125f6", borderRadius:2 }}>
//     <Typography variant="h5" color="white" align="center">
//       RM Multijob
//     </Typography>

//     {tab===0 && <JobDetails player={player}/>}
//     {tab===1 && <JobList jobs={jobs} player={player}/>}

//     <Box mt={3}>
//       <BottomNavigation value={tab} onChange={(e,v)=>setTab(v)} sx={{ bgcolor:"#25252b", borderRadius:2 }}>
//         <BottomNavigationAction label="Details" icon={<RestoreIcon/>}/>
//         <BottomNavigationAction label="Jobs" icon={<WorkIcon/>}/>
//       </BottomNavigation>
//     </Box>
//   </Box>
// </Box>
//   );
 
// }

// export default App;


import React, { useEffect, useState } from "react";

/* -------------------------------------------------- */
/* TYPES & CONFIG */
/* -------------------------------------------------- */
const isEnvBrowser = !(window as any).invokeNative;

const fetchNui = async (event: string, data: any = {}): Promise<void> => {
  if (isEnvBrowser) {
    console.log("NUI CALLBACK →", event, data);
    if (event === "selectJob") {
      window.postMessage({ action: "setPlayer", job: data.job, label: data.job.charAt(0).toUpperCase() + data.job.slice(1), grade: "Employee", onduty: false }, "*");
    }
    if (event === "toggleDuty") {
      window.postMessage({ action: "setPlayer", job: data.job, label: data.job.charAt(0).toUpperCase() + data.job.slice(1), grade: "Employee", onduty: Math.random() > 0.5 }, "*");
    }
    if (event === "deleteJob") { alert("Job removed (mock)"); }
    return;
  }
  await fetch(`https://${(window as any).GetParentResourceName()}/${event}`, {
    method: "POST", headers: { "Content-Type": "application/json; charset=UTF-8" }, body: JSON.stringify(data),
  });
};

/* -------------------------------------------------- */
/* STYLES */
/* -------------------------------------------------- */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --gold: #F5C842;
    --gold-dim: #c9a227;
    --gold-pale: #fdf3c0;
    --gold-glow: rgba(245,200,66,0.18);
    --bg: #0f0e0b;
    --surface: #19180f;
    --surface2: #211f12;
    --border: rgba(245,200,66,0.15);
    --border-strong: rgba(245,200,66,0.35);
    --text: #f0e8c8;
    --text-dim: #8a7e58;
    --danger: #e05252;
    --success: #52c47a;
    --radius: 12px;
  }

  body { font-family: 'DM Sans', sans-serif; background: transparent; }

  .app {
    width: 420px;
    height: 560px;
    background: var(--bg);
    border: 1px solid var(--border-strong);
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow: 0 0 60px rgba(245,200,66,0.08), 0 24px 60px rgba(0,0,0,0.7);
    position: relative;
  }

  .app::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
  }

  /* HEADER */
  .header {
    padding: 18px 22px 16px;
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    gap: 10px;
    background: linear-gradient(180deg, rgba(245,200,66,0.05) 0%, transparent 100%);
  }

  .header-icon {
    width: 32px; height: 32px;
    background: var(--gold);
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }

  .header-icon svg { width: 18px; height: 18px; fill: #0f0e0b; }

  .header-title {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 15px;
    color: var(--text);
    letter-spacing: 0.04em;
  }

  .header-sub {
    font-size: 11px;
    color: var(--text-dim);
    font-weight: 300;
  }

  /* TABS */
  .tabs {
    display: flex;
    padding: 12px 16px 0;
    gap: 4px;
    background: var(--bg);
  }

  .tab-btn {
    flex: 1;
    background: none;
    border: 1px solid transparent;
    border-bottom: none;
    padding: 10px 8px;
    font-family: 'Syne', sans-serif;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    cursor: pointer;
    border-radius: 8px 8px 0 0;
    color: var(--text-dim);
    transition: all 0.2s;
    display: flex; align-items: center; justify-content: center; gap: 6px;
  }

  .tab-btn.active {
    background: var(--surface);
    border-color: var(--border);
    color: var(--gold);
  }

  .tab-btn:not(.active):hover { color: var(--text); }

  /* CONTENT */
  .content {
    flex: 1;
    background: var(--surface);
    overflow-y: auto;
    padding: 20px;
    border: 1px solid var(--border);
    border-top: none;
    margin: 0 16px;
    border-radius: 0 0 12px 12px;
  }

  .content::-webkit-scrollbar { width: 4px; }
  .content::-webkit-scrollbar-track { background: transparent; }
  .content::-webkit-scrollbar-thumb { background: var(--border-strong); border-radius: 2px; }

  /* BOTTOM NAV */
  .bottom { padding: 14px 16px; background: var(--bg); }

  /* JOB DETAILS */
  .detail-label {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--text-dim);
    margin-bottom: 12px;
  }

  .job-badge {
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 16px 18px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .job-icon-circle {
    width: 44px; height: 44px;
    background: var(--gold-glow);
    border: 1px solid var(--border-strong);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }

  .job-icon-circle svg { width: 22px; height: 22px; stroke: var(--gold); fill: none; }

  .job-name {
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 17px;
    color: var(--text);
  }

  .job-grade {
    font-size: 12px;
    color: var(--text-dim);
    margin-top: 2px;
  }

  .row-card {
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 14px 18px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .row-label {
    font-size: 12px;
    color: var(--text-dim);
    font-weight: 500;
  }

  .row-value {
    font-family: 'Syne', sans-serif;
    font-size: 13px;
    font-weight: 700;
    color: var(--text);
  }

  /* TOGGLE */
  .toggle-wrap { display: flex; align-items: center; gap: 8px; }

  .toggle {
    position: relative;
    width: 42px; height: 24px;
    cursor: pointer;
  }

  .toggle input { opacity: 0; width: 0; height: 0; }

  .toggle-track {
    position: absolute;
    inset: 0;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    transition: all 0.2s;
  }

  .toggle-thumb {
    position: absolute;
    top: 3px; left: 3px;
    width: 16px; height: 16px;
    background: var(--text-dim);
    border-radius: 50%;
    transition: all 0.2s;
  }

  .toggle.on .toggle-track { background: rgba(82,196,122,0.15); border-color: var(--success); }
  .toggle.on .toggle-thumb { background: var(--success); transform: translateX(18px); }

  .duty-badge {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.06em;
    padding: 3px 8px;
    border-radius: 20px;
  }

  .duty-badge.on { background: rgba(82,196,122,0.15); color: var(--success); border: 1px solid rgba(82,196,122,0.3); }
  .duty-badge.off { background: rgba(138,126,88,0.15); color: var(--text-dim); border: 1px solid rgba(138,126,88,0.2); }

  /* BUTTONS */
  .btn {
    border: none;
    padding: 11px 18px;
    border-radius: 8px;
    font-family: 'Syne', sans-serif;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.15s;
    display: flex; align-items: center; gap: 6px;
  }

  .btn-danger {
    background: rgba(224,82,82,0.12);
    color: var(--danger);
    border: 1px solid rgba(224,82,82,0.25);
    width: 100%;
    justify-content: center;
    margin-top: 6px;
  }

  .btn-danger:hover { background: rgba(224,82,82,0.22); }

  .btn-ghost {
    background: transparent;
    color: var(--text-dim);
    border: 1px solid var(--border);
  }

  .btn-ghost:hover { color: var(--text); border-color: var(--border-strong); }

  .btn-primary {
    background: var(--gold);
    color: #0f0e0b;
  }

  .btn-primary:hover { background: var(--gold-dim); }

  /* JOB LIST */
  .job-row {
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 13px 16px;
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 8px;
    cursor: pointer;
    transition: all 0.15s;
    position: relative;
    overflow: hidden;
  }

  .job-row::before {
    content: '';
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 3px;
    background: transparent;
    border-radius: 2px 0 0 2px;
    transition: background 0.15s;
  }

  .job-row:hover { border-color: var(--border-strong); }
  .job-row:hover::before { background: var(--gold); }
  .job-row.active { border-color: rgba(245,200,66,0.4); background: rgba(245,200,66,0.06); cursor: default; }
  .job-row.active::before { background: var(--gold); }

  .job-row-name {
    flex: 1;
    font-family: 'Syne', sans-serif;
    font-size: 13px;
    font-weight: 600;
    color: var(--text);
  }

  .active-chip {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--gold);
    background: rgba(245,200,66,0.12);
    border: 1px solid rgba(245,200,66,0.25);
    padding: 3px 8px;
    border-radius: 20px;
  }

  .icon-btn {
    background: none;
    border: 1px solid transparent;
    width: 30px; height: 30px;
    border-radius: 6px;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    color: var(--text-dim);
    transition: all 0.15s;
    flex-shrink: 0;
  }

  .icon-btn:hover { background: rgba(224,82,82,0.12); color: var(--danger); border-color: rgba(224,82,82,0.2); }
  .icon-btn svg { width: 15px; height: 15px; }

  /* DIALOG */
  .dialog-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0.75);
    display: flex; align-items: center; justify-content: center;
    z-index: 100;
    backdrop-filter: blur(4px);
  }

  .dialog {
    background: var(--surface);
    border: 1px solid var(--border-strong);
    border-radius: 14px;
    padding: 24px;
    width: 280px;
    position: relative;
  }

  .dialog::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
    border-radius: 14px 14px 0 0;
  }

  .dialog-title {
    font-family: 'Syne', sans-serif;
    font-size: 15px;
    font-weight: 800;
    color: var(--text);
    margin-bottom: 10px;
  }

  .dialog-body {
    font-size: 13px;
    color: var(--text-dim);
    margin-bottom: 20px;
    line-height: 1.5;
  }

  .dialog-actions { display: flex; gap: 8px; }
  .dialog-actions .btn { flex: 1; justify-content: center; }

  /* EMPTY */
  .empty { text-align: center; padding: 40px 20px; color: var(--text-dim); font-size: 13px; }
  .empty svg { width: 36px; height: 36px; stroke: var(--text-dim); fill: none; margin-bottom: 10px; opacity: 0.5; }
`;

/* -------------------------------------------------- */
/* TOGGLE COMPONENT */
/* -------------------------------------------------- */
const Toggle = ({ on, onChange }: { on: boolean; onChange: () => void }) => (
  <label className={`toggle ${on ? "on" : ""}`} onClick={onChange}>
    <div className="toggle-track" />
    <div className="toggle-thumb" />
  </label>
);

/* -------------------------------------------------- */
/* JOB DETAILS */
/* -------------------------------------------------- */
const JobDetails = ({ player }: { player: any }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  if (!player) return (
    <div className="empty">
      <svg viewBox="0 0 24 24" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/></svg>
      <div>Waiting for player data…</div>
    </div>
  );

  return (
    <>
      <div className="detail-label">Current Job</div>

      <div className="job-badge">
        <div className="job-icon-circle">
          <svg viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2"/>
            <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
          </svg>
        </div>
        <div>
          <div className="job-name">{player.label}</div>
          <div className="job-grade">{player.grade}</div>
        </div>
      </div>

      <div className="row-card">
        <span className="row-label">Duty Status</span>
        <div className="toggle-wrap">
          <span className={`duty-badge ${player.onduty ? "on" : "off"}`}>
            {player.onduty ? "ON DUTY" : "OFF DUTY"}
          </span>
          <Toggle on={player.onduty} onChange={() => fetchNui("toggleDuty", { job: player.job })} />
        </div>
      </div>

      <div className="row-card">
        <span className="row-label">Hours This Week</span>
        <span className="row-value">00:00</span>
      </div>

      <div className="row-card">
        <span className="row-label">Colleagues Active</span>
        <span className="row-value">3</span>
      </div>

      <button className="btn btn-danger" onClick={() => setConfirmOpen(true)}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:14,height:14}}>
          <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6m4-6v6"/>
        </svg>
        Remove Job
      </button>

      {confirmOpen && (
        <div className="dialog-overlay">
          <div className="dialog">
            <div className="dialog-title">Remove Job?</div>
            <div className="dialog-body">This will remove <strong style={{color:"var(--text)"}}>{player.label}</strong> from your saved jobs.</div>
            <div className="dialog-actions">
              <button className="btn btn-ghost" onClick={() => setConfirmOpen(false)}>Cancel</button>
              <button className="btn btn-danger" style={{marginTop:0}} onClick={() => fetchNui("deleteJob", { job: player.job })}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

/* -------------------------------------------------- */
/* JOB LIST */
/* -------------------------------------------------- */
const JobList = ({ jobs, player }: { jobs: any[]; player: any }) => {
  const [deleteTarget, setDeleteTarget] = useState<any>(null);

  if (!jobs.length) return (
    <div className="empty">
      <svg viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/><path d="M16 12h.01"/></svg>
      <div>Loading jobs…</div>
    </div>
  );

  return (
    <>
      {jobs.map(job => {
        const active = player?.job === job.name;
        return (
          <div
            key={job.name}
            className={`job-row ${active ? "active" : ""}`}
            onClick={() => !active && fetchNui("selectJob", { job: job.name })}
          >
            <div className="job-row-name">{job.label}</div>
            {active && <span className="active-chip">Active</span>}
            {!active && (
              <button
                className="icon-btn"
                onClick={e => { e.stopPropagation(); setDeleteTarget(job); }}
                title="Remove"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6m4-6v6"/>
                </svg>
              </button>
            )}
          </div>
        );
      })}

      {deleteTarget && (
        <div className="dialog-overlay">
          <div className="dialog">
            <div className="dialog-title">Remove Job?</div>
            <div className="dialog-body">Delete <strong style={{color:"var(--text)"}}>{deleteTarget.label}</strong> from your saved jobs?</div>
            <div className="dialog-actions">
              <button className="btn btn-ghost" onClick={() => setDeleteTarget(null)}>Cancel</button>
              <button className="btn btn-danger" style={{marginTop:0}} onClick={() => { fetchNui("deleteJob", { job: deleteTarget.name }); setDeleteTarget(null); }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

/* -------------------------------------------------- */
/* MAIN APP */
/* -------------------------------------------------- */
export function App() {
  const [tab, setTab] = useState(0);
  const [player, setPlayer] = useState<any>(null);
  const [jobs, setJobs] = useState<any[]>([]);

  useEffect(() => {
    const handler = (event: MessageEvent) => {
      const data = event.data;
      if (data.action === "setPlayer") setPlayer(data);
      if (data.action === "setJobs" && data.jobs) setJobs(data.jobs);
    };
    window.addEventListener("message", handler);

    if (isEnvBrowser) {
      setTimeout(() => {
        setPlayer({ job: "police", label: "Police", grade: "Sergeant", onduty: true });
        setJobs([
          { name: "unemployed", label: "Unemployed" },
          { name: "police", label: "Police" },
          { name: "ambulance", label: "Ambulance" },
          { name: "mechanic", label: "Mechanic" },
          { name: "taxi", label: "Taxi Driver" },
          { name: "realestate", label: "Real Estate" },
          { name: "cardealer", label: "Car Dealer" },
          { name: "lawyer", label: "Lawyer" },
          { name: "judge", label: "Judge" },
          { name: "reporter", label: "Reporter" },
        ]);
      }, 500);
    } else {
      fetchNui("nuiReady");
    }

    return () => window.removeEventListener("message", handler);
  }, []);

  useEffect(() => {
    if (tab === 1 && !isEnvBrowser) fetchNui("requestJobs");
  }, [tab]);

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <div className="header">
          <div className="header-icon">
            <svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          </div>
          <div>
            <div className="header-title">RM MULTIJOB</div>
            <div className="header-sub">{player ? `${player.label} · ${player.grade}` : "Select a job to begin"}</div>
          </div>
        </div>

        <div className="tabs">
          <button className={`tab-btn ${tab === 0 ? "active" : ""}`} onClick={() => setTab(0)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:13,height:13}}>
              <circle cx="12" cy="8" r="4"/><path d="M6 20v-2a6 6 0 0 1 12 0v2"/>
            </svg>
            Overview
          </button>
          <button className={`tab-btn ${tab === 1 ? "active" : ""}`} onClick={() => setTab(1)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:13,height:13}}>
              <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
            </svg>
            Jobs
          </button>
        </div>

        <div className="content" style={{position:"relative"}}>
          {tab === 0 && <JobDetails player={player} />}
          {tab === 1 && <JobList jobs={jobs} player={player} />}
        </div>

        <div className="bottom" />
      </div>
    </>
  );
}

export default App;