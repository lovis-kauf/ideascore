$(document).ready(function () {
    let currentStep = 1;
    let totalSteps = 5;

    function showStep(step) {
        // Hide all steps
        $("#question-form .form-group").hide();

        // Show the current step
        $(`#step-${step}`).show();

        // Update the Back/Next/Submit buttons
        if (step === totalSteps) {
            $("#next").addClass("d-none");
            $("#submit").removeClass("d-none");
        } else {
            $("#next").removeClass("d-none");
            $("#submit").addClass("d-none");
        }

        if (step === 1) {
            $("#back").addClass("d-none");
        } else {
            $("#back").removeClass("d-none");
        }
    }

    // Initially show the first step
    showStep(currentStep);

    // Handle the Back button click
    $("#back").click(function () {
        currentStep--;
        showStep(currentStep);
    });

    // Handle the Next button click
    $("#next").click(function () {
        currentStep++;
        showStep(currentStep);
    });

    // Handle the Submit button click
    $("#submit").click(async function () {
        // Collect user input from all steps
        const userInput = $("#question-form textarea")
            .map(function () {
                return $(this).val();
            })
            .get()
            .join("\n\n");
    
        try {
            // Send userInput to your server-side API
            const response = await axios.post('/api/ask', { userInput });
    
            // Display the generated answer
            const answer = response.data.answer;
            alert(`Generated answer: ${answer}`);
        } catch (error) {
            console.error(error);
            alert('Error communicating with the server');
        }
    });
});
