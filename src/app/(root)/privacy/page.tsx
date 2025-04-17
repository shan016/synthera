import React from 'react';

const PrivacyPolicy = () => {
    return (
        <section className="p-8 flex justify-center items-center">
            <div className="max-w-3xl mx-auto">
                {/* Malay Section */}
                <h2 className="text-3xl font-semibold mb-4">Polisi Privasi</h2>

                <p className="text-lg mb-6">
                    Kami komited untuk melindungi privasi anda. Sila baca polisi privasi ini untuk memahami bagaimana kami mengumpul, menggunakan, dan melindungi maklumat peribadi anda.
                </p>

                <div className="mb-6">
                    <h3 className="text-xl font-semibold">Maklumat yang Dikumpul</h3>
                    <p>
                        Kami hanya mengumpul maklumat peribadi yang anda berikan secara sukarela semasa mendaftar untuk menggunakan perkhidmatan kami, seperti nama, alamat e-mel, dan nombor telefon.
                    </p>
                </div>

                <div className="mb-6">
                    <h3 className="text-xl font-semibold">Penggunaan Maklumat</h3>
                    <p>
                        Maklumat yang dikumpul digunakan untuk menyediakan dan meningkatkan perkhidmatan kami, berkomunikasi dengan anda, dan mematuhi keperluan undang-undang yang berkaitan. Kami tidak akan memberikan maklumat peribadi anda kepada pihak ketiga atau mana-mana individu tanpa kebenaran anda.
                    </p>
                </div>

                <div className="mb-6">
                    <h3 className="text-xl font-semibold">Penyimpanan dan Keselamatan</h3>
                    <p>
                        Kami mengambil langkah-langkah keselamatan yang sesuai untuk melindungi maklumat peribadi anda daripada akses tidak sah, penggunaan, atau pendedahan. Walau bagaimanapun, tiada kaedah penghantaran data melalui Internet atau penyimpanan elektronik yang 100% selamat, dan kami tidak dapat menjamin keselamatan mutlak data anda.
                    </p>
                </div>

                <div className="mb-6">
                    <h3 className="text-xl font-semibold">Akses dan Pembetulan</h3>
                    <p>
                        Anda berhak untuk mengakses dan mengemas kini maklumat peribadi anda. Jika anda ingin membetulkan atau mengemas kini sebarang maklumat, sila hubungi kami melalui maklumat hubungan yang disediakan di bawah.
                    </p>
                </div>

                <div className="mb-6">
                    <h3 className="text-xl font-semibold">Pindaan</h3>
                    <p>
                        Kami berhak untuk mengubah atau mengemas kini polisi privasi ini pada bila-bila masa. Sebarang perubahan akan dipaparkan di halaman ini dengan tarikh kemas kini yang baru.
                    </p>
                </div>

                <div className="mb-6">
                    <h3 className="text-xl font-semibold">Syarat Kelayakan</h3>
                    <p>
                        Kami tidak mempunyai had kelayakan untuk menggunakan perkhidmatan kami.
                    </p>
                </div>

                <div className="mb-6">
                    <h3 className="text-xl font-semibold">Hubungi Kami</h3>
                    <p>
                        Jika anda mempunyai sebarang soalan atau kebimbangan mengenai polisi privasi ini, sila hubungi kami di alamat e-mel atau nombor telefon yang tertera di halaman hubungan kami.
                    </p>
                </div>

                <div className="mt-6">
                    <p className="text-sm text-muted-foreground">
                        Dengan menggunakan perkhidmatan kami, anda bersetuju dengan polisi privasi ini.
                    </p>
                </div>

                {/* English Section */}
                <div className="mt-10">
                    <h2 className="text-3xl font-semibold mb-4">Privacy Policy</h2>

                    <p className="text-lg mb-6">
                        We are committed to protecting your privacy. Please read this privacy policy to understand how we collect, use, and protect your personal information.
                    </p>

                    <div className="mb-6">
                        <h3 className="text-xl font-semibold">Information We Collect</h3>
                        <p>
                            We only collect personal information that you voluntarily provide when registering for our services, such as your name, email address, and phone number.
                        </p>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-xl font-semibold">Use of Information</h3>
                        <p>
                            The information collected is used to provide and improve our services, communicate with you, and comply with relevant legal requirements. We will not disclose your personal information to any third party or individual without your consent.
                        </p>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-xl font-semibold">Data Storage and Security</h3>
                        <p>
                            We take appropriate security measures to protect your personal information from unauthorized access, use, or disclosure. However, no method of data transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee the absolute security of your data.
                        </p>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-xl font-semibold">Access and Correction</h3>
                        <p>
                            You have the right to access and update your personal information. If you wish to correct or update any information, please contact us using the contact information provided below.
                        </p>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-xl font-semibold">Amendments</h3>
                        <p>
                            We reserve the right to modify or update this privacy policy at any time. Any changes will be posted on this page with the updated date.
                        </p>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-xl font-semibold">Eligibility Criteria</h3>
                        <p>
                            We do not have specific eligibility requirements for using our services.
                        </p>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-xl font-semibold">Contact Us</h3>
                        <p>
                            If you have any questions or concerns regarding this privacy policy, please contact us at the email address or phone number provided on our contact page.
                        </p>
                    </div>

                    <div className="mt-6">
                        <p className="text-sm text-muted-foreground">
                            By using our service, you agree to this privacy policy.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PrivacyPolicy;
