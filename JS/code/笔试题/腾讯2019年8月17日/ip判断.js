function isPrivate(ip){
  // TODO
  const arr = ip.split('.')
  if(arr[0] === '10')
    return true;
  if(arr[0]==='172'&&parseInt(arr[1])>=16&&parseInt(arr[1])<=31)
    return true;
  if(arr[0]==='192'&&arr[1]==='168')
    return true;
  if(arr[0]==='127'&&arr[1]==='0'&&arr[2]==='0'&&parseInt(arr[3])>0&&parseInt(arr[3])<256)
    return true
  return false;
}

console.log(isPrivate('10.0.0.1'));
