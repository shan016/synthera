import React from 'react';

const TermsConditions = () => {
    return (
        <section className="p-8 flex items-center justify-center">
            <div className="max-w-3xl mx-auto">
                {/* Malay Section */}
                <h2 className="text-3xl font-semibold mb-4">Terma & Syarat</h2>

                <p className="text-lg mb-6">
                    Sila baca terma-terma ini dengan teliti sebelum menggunakan perkhidmatan kami. Dengan mengakses atau menggunakan perkhidmatan kami, anda bersetuju dengan terma-terma ini.
                </p>

                <div className="mb-6">
                    <h3 className="text-xl font-semibold">Polisi Pembayaran Balik</h3>
                    <p>
                        Tiada bayaran balik akan diberikan untuk sebarang perkhidmatan yang telah disediakan. Sila pastikan semua maklumat adalah betul sebelum membuat sebarang pembayaran.
                    </p>
                </div>

                <div className="mb-6">
                    <h3 className="text-xl font-semibold">Penggunaan Data</h3>
                    <p>
                        Kami hanya menggunakan data anda untuk tujuan perkhidmatan kami dan tidak akan berkongsi dengan pihak ketiga kecuali jika dikehendaki oleh undang-undang.
                    </p>
                </div>

                <div className="mb-6">
                    <h3 className="text-xl font-semibold">Had Liabiliti</h3>
                    <p>
                        Kami tidak bertanggungjawab atas sebarang tindakan yang diambil oleh pihak berkuasa seperti polis yang menyiasat atau mengambil tindakan berdasarkan maklumat yang diperoleh melalui sistem kami. Gunakan perkhidmatan kami atas risiko anda sendiri.
                    </p>
                </div>

                <div className="mb-6">
                    <h3 className="text-xl font-semibold">Pindaan</h3>
                    <p>
                        Kami berhak untuk mengubah atau mengemas kini terma-terma ini pada bila-bila masa. Sebarang perubahan akan dipaparkan di halaman ini dengan tarikh kemas kini.
                    </p>
                </div>

                <div className="mb-6">
                    <h3 className="text-xl font-semibold">Hubungi Kami</h3>
                    <p>
                        Jika anda mempunyai sebarang soalan atau kebimbangan mengenai terma-terma ini, sila hubungi kami.
                    </p>
                </div>

                <div className="mt-6">
                    <p className="text-sm text-gray-600">
                        Dengan menggunakan perkhidmatan kami, anda mengakui dan menerima Terma & Syarat ini.
                    </p>
                </div>

                {/* English Section */}
                <div className="mt-10">
                    <h2 className="text-3xl font-semibold mb-4">Terms & Conditions</h2>

                    <p className="text-lg mb-6">
                        Please read these terms carefully before using our services. By accessing or using our service, you agree to be bound by these terms.
                    </p>

                    <div className="mb-6">
                        <h3 className="text-xl font-semibold">Refund Policy</h3>
                        <p>
                            No refunds will be issued for any services rendered. Please ensure that all information is correct before proceeding with any payment.
                        </p>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-xl font-semibold">Data Usage</h3>
                        <p>
                            We only use your data for the purposes of our service and will not share it with third parties unless required by law.
                        </p>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-xl font-semibold">Limitation of Liability</h3>
                        <p>
                            We are not responsible for any actions taken by authorities such as the police who investigate or take action based on the information obtained through our system. Use our service at your own risk.
                        </p>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-xl font-semibold">Amendments</h3>
                        <p>
                            We reserve the right to modify or update these terms at any time. Any changes will be posted on this page with the updated date.
                        </p>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-xl font-semibold">Contact Us</h3>
                        <p>
                            If you have any questions or concerns about these terms, feel free to contact us.
                        </p>
                    </div>

                    <div className="mt-6">
                        <p className="text-sm text-gray-600">
                            By using our service, you acknowledge and accept these Terms & Conditions.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TermsConditions;
