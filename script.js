document.addEventListener('DOMContentLoaded', function () {
    const branchSelector = document.getElementById('branch');

    branchSelector.addEventListener('change', function () {
        const selectedBranch = branchSelector.value;
        // Placeholder function to update dashboard content based on selected branch
        updateDashboardContent(selectedBranch);
    });

    function updateDashboardContent(branch) {
        alert('Selected branch: ' + branch);
    }
});
