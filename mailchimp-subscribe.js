(function () {
  var MC_ACTION_BASE = 'https://rimrockandotter.us6.list-manage.com/subscribe/post-json';
  var MC_U = 'b5ba028460775c3546fe249e1';
  var MC_ID = 'e09ce7a0f5';
  var MC_FID = '007b35e1f0';
  var MC_HONEYPOT = 'b_b5ba028460775c3546fe249e1_e09ce7a0f5';

  window.subscribeToMailchimp = function (email, fname) {
    return new Promise(function (resolve, reject) {
      var cbName = 'mcJSONPCallback_' + Date.now() + '_' + Math.floor(Math.random() * 100000);
      var script = document.createElement('script');
      var timeout = setTimeout(function () {
        cleanup();
        reject(new Error('Mailchimp request timed out'));
      }, 10000);

      function cleanup() {
        clearTimeout(timeout);
        delete window[cbName];
        if (script.parentNode) script.parentNode.removeChild(script);
      }

      window[cbName] = function (data) {
        cleanup();
        resolve(data);
      };

      var params = new URLSearchParams({
        u: MC_U, id: MC_ID, f_id: MC_FID,
        EMAIL: email || '', FNAME: fname || '', c: cbName
      });
      params.append(MC_HONEYPOT, '');

      script.src = MC_ACTION_BASE + '?' + params.toString();
      script.onerror = function () { cleanup(); reject(new Error('Failed to reach Mailchimp')); };
      document.body.appendChild(script);
    });
  };
})();
