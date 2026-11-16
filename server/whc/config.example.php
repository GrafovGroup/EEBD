<?php
// Copy as config.php OUTSIDE every public document root. Permissions: 0600.
// Do not enable until host tests, mailbox routing and the worker are verified.
return [
    'enabled' => false,
    'delivery_verified' => false,
    'origin' => 'https://eebd.ca',
    'secret' => '', // Generate at least 48 random bytes, encoded as hex; never commit.
    'recipient' => 'info@eebd.ca',
    'sender' => 'info@eebd.ca', // Must be authorized by the actual WHC mail configuration.
    'retention_days' => 0, // Set only after owner review; includes the private request store.
    'public_roots' => [], // Absolute paths to ALL web roots on this hosting account.
];
