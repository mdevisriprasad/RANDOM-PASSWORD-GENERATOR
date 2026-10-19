const password =
      document.getElementById("password");

    const length =
      document.getElementById("length");

    const lengthValue =
      document.getElementById("lengthValue");

    const uppercase =
      document.getElementById("uppercase");

    const lowercase =
      document.getElementById("lowercase");

    const numbers =
      document.getElementById("numbers");

    const symbols =
      document.getElementById("symbols");

    const generateBtn =
      document.getElementById("generateBtn");

    const copyBtn =
      document.getElementById("copyBtn");

    const strengthText =
      document.getElementById("strengthText");

    const strengthFill =
      document.getElementById("strengthFill");

    const message =
      document.getElementById("message");


    /* ==========================================
       CHARACTER SETS
    ========================================== */

    const upperChars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    const lowerChars =
      "abcdefghijklmnopqrstuvwxyz";

    const numberChars =
      "0123456789";

    const symbolChars =
      "!@#$%^&*()_+-=[]{}|;:,.<>?";


    /* ==========================================
       UPDATE LENGTH
    ========================================== */

    length.addEventListener("input", function() {

      lengthValue.textContent =
        length.value;

      generatePassword();

    });


    /* ==========================================
       GENERATE PASSWORD
    ========================================== */

    function generatePassword() {

      const passwordLength =
        Number(length.value);


      let characters = "";


      if(uppercase.checked) {

        characters += upperChars;

      }


      if(lowercase.checked) {

        characters += lowerChars;

      }


      if(numbers.checked) {

        characters += numberChars;

      }


      if(symbols.checked) {

        characters += symbolChars;

      }


      /* No option selected */

      if(characters.length === 0) {

        password.value =
          "Select an option";

        updateStrength(0);

        return;

      }


      let result = "";


      /*
        crypto.getRandomValues()
        gives stronger randomness than
        Math.random() for passwords.
      */

      const randomValues =
        new Uint32Array(passwordLength);

      crypto.getRandomValues(randomValues);


      for(let i = 0; i < passwordLength; i++) {

        const index =
          randomValues[i] % characters.length;

        result += characters[index];

      }


      password.value =
        result;


      updateStrength(result);

    }


    /* ==========================================
       PASSWORD STRENGTH
    ========================================== */

    function updateStrength(value) {

      let score = 0;


      if(value.length >= 8)
        score++;


      if(value.length >= 12)
        score++;


      if(/[A-Z]/.test(value))
        score++;


      if(/[a-z]/.test(value))
        score++;


      if(/[0-9]/.test(value))
        score++;


      if(/[^A-Za-z0-9]/.test(value))
        score++;


      if(score <= 2) {

        strengthText.textContent =
          "Weak";

        strengthText.style.color =
          "#ef4444";

        strengthFill.style.width =
          "30%";

        strengthFill.style.background =
          "#ef4444";

      }

      else if(score <= 4) {

        strengthText.textContent =
          "Medium";

        strengthText.style.color =
          "#f59e0b";

        strengthFill.style.width =
          "65%";

        strengthFill.style.background =
          "#f59e0b";

      }

      else {

        strengthText.textContent =
          "Strong";

        strengthText.style.color =
          "#22c55e";

        strengthFill.style.width =
          "100%";

        strengthFill.style.background =
          "#22c55e";

      }

    }


    /* ==========================================
       GENERATE BUTTON
    ========================================== */

    generateBtn.addEventListener(
      "click",
      function() {

        generatePassword();

        message.textContent =
          "New password generated!";

        setTimeout(function() {

          message.textContent = "";

        }, 2000);

      }
    );


    /* ==========================================
       OPTION CHANGES
    ========================================== */

    uppercase.addEventListener(
      "change",
      generatePassword
    );

    lowercase.addEventListener(
      "change",
      generatePassword
    );

    numbers.addEventListener(
      "change",
      generatePassword
    );

    symbols.addEventListener(
      "change",
      generatePassword
    );


    /* ==========================================
       COPY PASSWORD
    ========================================== */

    copyBtn.addEventListener(
      "click",
      async function() {

        if(
          !password.value ||
          password.value === "Select an option"
        ) {

          return;

        }


        try {

          await navigator.clipboard.writeText(
            password.value
          );

          copyBtn.textContent =
            "✓ Copied!";

          message.textContent =
            "Password copied to clipboard!";


          setTimeout(function() {

            copyBtn.textContent =
              "Copy";

            message.textContent =
              "";

          }, 2000);

        }

        catch(error) {

          /* Fallback for older browsers */

          password.select();

          document.execCommand("copy");

          copyBtn.textContent =
            "✓ Copied!";

        }

      }
    );


    /* ==========================================
       CREATE FIRST PASSWORD
    ========================================== */

    generatePassword();